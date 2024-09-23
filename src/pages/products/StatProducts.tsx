import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Product from "../../interfaces/Product.tsx";
import "../../index.css";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const StatProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    // Fetch products and categories
    fetch("http://localhost:3000/product")
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    fetch("http://localhost:3000/category")
      .then((res) => res.json())
      .then((data) => {
        const categoryMap = data.data.reduce(
          (acc: { [key: string]: string }, category: Category) => {
            acc[category._id] = category.name;
            return acc;
          },
          {}
        );
        setCategories(categoryMap);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "" ||
        product.category.includes(selectedCategory)) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.metadata.some(
          (meta) =>
            meta.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meta.size.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        product.unit_price.toString().includes(searchQuery))
  );

  // Function to trigger CSV download
  const handleDownloadCSV = () => {
    const csvRows = [];

    // Add empty columns and centered title for CSV
    const title = [`,,Stock Information as at ${currentDate},,`]; // Adding empty columns to center
    const headers = [
      "Product Name",
      "Category",
      "Unit Price",
      "Color",
      "Size",
      "Quantity",
      "Available Status",
    ];

    // Add title and headers
    csvRows.push(title.join(","));
    csvRows.push(headers.join(","));

    filteredProducts.forEach((product) => {
      product.metadata.forEach((meta) => {
        const isAvailable = meta.quantity > 0 ? "Available" : "Not Available";
        const csvRow = [
          product.name,
          categories[product.category[0]] || "Unknown",
          product.unit_price,
          meta.color,
          meta.size,
          meta.quantity,
          isAvailable,
        ];
        csvRows.push(csvRow.join(","));
      });
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `stock_information_${currentDate}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Function to trigger PDF download
  const handleDownloadPDF = () => {
    const input = document.getElementById("stock-table") as HTMLElement;
    const pdf = new jsPDF("p", "mm", "a4");

    // Center title and date in PDF
    const title = `Stock Information as at ${currentDate}`;
    pdf.setFontSize(18);

    const pageWidth = pdf.internal.pageSize.getWidth();
    const textWidth = pdf.getTextWidth(title);

    const titleXPosition = (pageWidth - textWidth) / 2; // Centering the text

    pdf.text(title, titleXPosition, 20);

    // Capture the table and add it to the PDF
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 5, 30, imgWidth, imgHeight);
      pdf.save(`stock_information_${currentDate}.pdf`);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-4">
        {/* Button Group */}
        <div className="flex gap-4">
          <Link to="/stat-orders">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg  px-20 py-5 text-center me-2 mb-2"
            >
              Order Summary
            </button>
          </Link>
          <Link to="/stat-products">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg  px-20 py-5 text-center me-2 mb-2"
            >
              Stock Summary
            </button>
          </Link>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Stock Information
        </h2>
        <div className="flex justify-between mb-4">
          {/* Align Search bar, Category filter, and Download buttons */}
          <div className="flex gap-4">
            {/* Search bar */}
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
              />
              <div className="absolute top-0 left-0 mt-2.5 ml-4 text-gray-500">
                <FaSearch size="20px" />
              </div>
            </div>

            {/* Category filter dropdown */}
            <div className="relative w-48">
              <select
                className="w-full h-10 pl-3 pr-10 rounded-full shadow-sm border border-gray-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {Object.keys(categories).map((categoryId) => (
                  <option key={categoryId} value={categoryId}>
                    {categories[categoryId]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleDownloadCSV}
              className="text-gray-900 bg-gradient-to-r from-green-200 to-green-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-green-100 dark:focus:ring-green-500 font-medium rounded-lg px-6 py-2 text-center"
            >
              Download CSV
            </button>
            <button
              onClick={handleDownloadPDF}
              className="text-gray-900 bg-gradient-to-r from-blue-200 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-500 font-medium rounded-lg px-6 py-2 text-center"
            >
              Download PDF
            </button>
          </div>
        </div>
        <div id="stock-table" className="bg-white shadow rounded-lg mt-8 p-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b">Product Name</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Category</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Unit Price</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Color</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Size</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Quantity</th>
                <th className="py-2 px-4 bg-gray-100 border-b">
                  Available Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) =>
                product.metadata.map((meta, metaIndex) => {
                  const isAvailable =
                    meta.quantity > 0 ? "Available" : "Not Available";

                  return (
                    <tr
                      key={`${product._id}-${metaIndex}`}
                      className="border-b"
                    >
                      <td className="py-2 px-4">{product.name}</td>
                      <td className="py-2 px-4">
                        {categories[product.category[0]] || "Unknown"}
                      </td>
                      <td className="py-2 px-4">{product.unit_price}</td>
                      <td className="py-2 px-4">{meta.color}</td>
                      <td className="py-2 px-4">{meta.size}</td>
                      <td className="py-2 px-4">{meta.quantity}</td>
                      <td
                        className={`py-2 px-4 ${
                          isAvailable === "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {isAvailable}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatProducts;
