import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Product from "../../interfaces/Product.tsx";
import { Link } from "react-router-dom";

import '../../dashboard/DashboardLayout.css'

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page

  useEffect(() => {
    fetch("http://localhost:3000/product")
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        // TODO: Handle error, e.g., display an error message to the user
      });

    // Fetch categories and map them by their IDs
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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle the deletion of a product
  const handleDelete = (productId: string) => {
    fetch(`http://localhost:3000/product/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product Deleted") {
          // Remove the deleted product from the state
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          console.error("Failed to delete the product:", data.message);
          // TODO: Handle the error, e.g., display an error message to the user
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // TODO: Handle the error, e.g., display an error message to the user
      });
  };

  // Function to get unique values from an array
  const getUniqueValues = (array: string[]) => [
    ...new Set(array.filter(Boolean)),
  ];

  // Function to get unique colors from metadata
  const getUniqueColors = (metadata) => {
    const colors = metadata.map((meta) => meta.color);
    return getUniqueValues(colors);
  };

  // Function to get unique sizes from metadata
  const getUniqueSizes = (metadata) => {
    const sizes = metadata.map((meta) => meta.size);
    return getUniqueValues(sizes);
  };

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/admin/dash">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/manage-products">Manage Products</Link>
            </li>
            <li>
              <Link to="/admin/stat-products">Stock Summary</Link>
            </li>
            <li>
              <Link to="">Orders</Link>
            </li>
            <li>
              <Link to="/admin/manage-reviews">Manage Reviews</Link>
            </li>
            <li>
              <Link to="/admin/manage-faq">Manage FAQs</Link>
            </li>
            <li>
              <Link to="">Finance Report</Link>
            </li>
            <li>
              <Link to="">Profile</Link>
            </li>
            <li>
              <Link to="">Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
    <div className="px-4 my-12">
      <div className="flex justify-between items-start ">
        <h2 className="text-3xl font-bold">Manage Your Products</h2>

        <div className="flex justify-between mb-4">
          {/* Search bar on the left side */}
          <div className="relative w-93 mr-3">
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

          {/* Category filter dropdown on the right side */}
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
      </div>

      <div className="flex justify-center">
        {/* Button Group */}
        <div className="flex gap-4">
          <Link to="/admin/create-product">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-500 font-semibold px-4 py-2 rounded transition duration-300">
              Add Product
            </button>
          </Link>
          <Link to="/admin/add-category">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-500 font-semibold px-4 py-2 rounded transition duration-300">
              Add Category
            </button>
          </Link>
          <Link to="/admin/add-subcategory">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-500 font-semibold px-4 py-2 rounded transition duration-300">
              Add Subcategory
            </button>
          </Link>
          {/* <Link to="/stat-orders">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-500 font-semibold px-4 py-2 rounded transition duration-300">
              Summary Report
            </button>
          </Link> */}
        </div>
      </div>

      <br />

      {/* Table */}
      <div className="flex justify-center min-h-screen">
        <table className="w-full  table-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold">
                Number
              </th>
              <th className="px-10 py-4 text-left text-sm font-semibold">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Unit Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Color
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Size
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Edit Or Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {currentProducts.map((product, index) => (
              <tr
                className="bg-white hover:bg-gray-100 transition duration-300 align-top"
                key={product._id}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 text-center align-top">
                  {index + 1 + indexOfFirstProduct}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 align-top">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-gray-700 align-top">
                  {categories[product.category[0]] || "Unknown"}
                </td>
                <td className="px-6 py-4 text-gray-700 align-top">
                  {product.unit_price}
                </td>
                <td className="px-6 py-4 text-gray-700 align-top">
                  {getUniqueColors(product.metadata).join(", ")}
                </td>
                <td className="px-6 py-4 text-gray-700 align-top">
                  {getUniqueSizes(product.metadata).join(", ")}
                </td>
                <td className="px-6 py-4 text-gray-700  align-top">
                  {product.metadata
                    .map((meta) => meta.quantity)
                    .reduce((acc, qty) => acc + qty, 0)}
                </td>
                <td className="px-6 py-4 flex gap-4 items-center align-top">
                  <Link to={`/admin/update-product/${product._id}`}>
                    <button className="text-cyan-600 font-medium hover:underline">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded transition duration-300"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-end mt-4 pb-24">
        <button
          
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700 mx-2 mt-2">
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
    </main>
    
    </div>

  );
};

export default ManageProducts;
