import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Product from "../../interfaces/Product.tsx";
import "../../index.css";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

import '../../dashboard/DashboardLayout.css'
import SidebarComp from "../../dashboard/SidebarComp.tsx";

const StatProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of products to display per page

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

  // Filter products based on search query and selected category
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

  // Pagination logic
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to trigger CSV download
  const handleDownloadCSV = () => {
    const csvRows = [];

    // Add empty columns and centered title for CSV
    const title = [`,,Stock Information as at ${currentDate},,`];
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

  // Function to trigger PDF download with all products
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const currentDate = new Date().toISOString().slice(0, 10);
    const pageWidth = pdf.internal.pageSize.getWidth();
  const title = `Stock Information as at ${currentDate}`;
  
  // Center the title and date in PDF
  pdf.setFontSize(18);
  const titleWidth = pdf.getTextWidth(title);
  pdf.text(title, (pageWidth - titleWidth) / 2, 20);
  
    const tableColumn = [
      "Product Name",
      "Category",
      "Unit Price",
      "Color",
      "Size",
      "Quantity",
      "Available Status",
    ];
  
    const tableRows = [];
  
    // Add products data into tableRows
    filteredProducts.forEach((product) => {
      product.metadata.forEach((meta) => {
        const isAvailable = meta.quantity > 0 ? "Available" : "Not Available";
        const productData = [
          product.name,
          categories[product.category[0]] || "Unknown",
          product.unit_price.toString(),
          meta.color,
          meta.size,
          meta.quantity.toString(),
          isAvailable,
        ];
        tableRows.push(productData);
      });
    });
  
    // Automatically generate table with headers and rows
    pdf.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40, // Initial vertical position on the page
      theme: 'grid', //  table theme (striped, grid, plain)
      styles: {
        fontSize: 10, // Adjust font size if needed
        cellPadding: 3, // Adjust cell padding for better readability
      },
      headStyles: {
        fillColor: [0, 150, 136], // Customize header background color
        textColor: [255, 255, 255], // Customize header text color
      },
    });
  
    pdf.save(`stock_information_${currentDate}.pdf`);
  };


  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <SidebarComp />

      {/* Main Content */}
      <main className="main-content">
    <div className="container mx-auto px-4 py-8">
      {/* Button Group */}
      <div className="flex justify-center mb-4">
        <div className="flex gap-4">
        <Link to="/admin/stat-products">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg  px-20 py-5 text-center me-2 mb-2"
            >
              Stock Summary
            </button>
          </Link>
          <Link to="/admin/stat-orders">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg  px-20 py-5 text-center me-2 mb-2"
            >
              Order Summary
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
          {/* Search bar, Category filter, and Download buttons */}
          <div className="flex gap-4">
            {/* Search bar */}
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
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
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1); // Reset to first page on category change
                }}
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
              className="text-gray-900 bg-gradient-to-r from-green-200 to-green-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg px-6 py-2 text-center"
            >
              Download CSV
            </button>
            <button
              onClick={handleDownloadPDF}
              className="text-gray-900 bg-gradient-to-r from-blue-200 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg px-6 py-2 text-center"
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
                <th className="py-2 px-4 bg-gray-100 border-b">Available Status</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) =>
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

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
};

export default StatProducts;
