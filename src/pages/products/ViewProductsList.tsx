import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Product from "../../interfaces/Product";
import Category from "../../interfaces/Category";

const ViewProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Set how many items to show per page

  useEffect(() => {
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

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Calculate displayed products for current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-4xl font-bold">Our Collection</h2>
        <div className="flex justify-between mb-4">
          {/* Search bar */}
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
      </div>

      {/* Product Grid */}
      <div className="grid gap-5 my-12 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        {currentProducts.map((product) => (
          <div key={product._id} className="text-center">
            <Link to={`/product/${product._id}`}>
              <div className="relative group overflow-hidden">
                <img
                  src={product.images_path[0]}
                  alt={product.name}
                  className="w-[287px] h-[450px] mx-auto object-cover object-center group-hover:scale-100 transition-transform duration-300"
                />
                {product.images_path[1] && (
                  <img
                    src={product.images_path[1]}
                    alt={product.name}
                    className="w-[287px] h-[450px] mx-auto object-cover object-center absolute top-0 left-0 opacity-0 group-hover:opacity-100"
                  />
                )}

                {/* Quick View Box */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-70 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Quick View
                </div>
              </div>
              <p className="font-semibold tracking-tight text-gray-500 mt-4">
                {product.name}
              </p>
              <p className="text-gray-500 font-regular">
                Category:
                {categories[product.category[0]] || "Unknown"}
                  </p>
              <p className="text-gray-500 font-regular ">
                LKR {product.unit_price}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
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
  );
};

export default ViewProductsList;
