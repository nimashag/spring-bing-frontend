import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa'; // Icon for view action

interface Product {
  _id: string;
  name: string;
  color: string;
  size: string;
  category: { name: string };
  unit_price: number;
  description: string;
  images_path: string[];
  total_sales: number;
}

const TrendingAndTopSelling: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [topSellingItems, setTopSellingItems] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Number of items per page

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/trending-products');
        setTrendingProducts(response.data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      }
    };

    const fetchTopSellingItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/top-selling-products');
        const productResponse = await axios.post('http://localhost:3001/api/products-by-ids', { productIds: response.data.productIds });
        setTopSellingItems(productResponse.data);
      } catch (error) {
        console.error('Error fetching top selling items:', error);
      }
    };

    fetchTrendingProducts();
    fetchTopSellingItems();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Pagination logic
  const paginate = (items: Product[], pageNumber: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderPagination = (totalItems: number, currentPage: number, setPage: React.Dispatch<React.SetStateAction<number>>) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Trending Products Table */}
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Trending Products</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Total Sales</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginate(trendingProducts, currentPage).map((product) => (
            <tr key={product._id} className="hover:bg-gray-100 cursor-pointer">
              <td className="py-2 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">{product.category?.name || 'General'}</td>
              <td className="py-2 px-4 border">{product.total_sales}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleProductClick(product)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {renderPagination(trendingProducts.length, currentPage, setCurrentPage)}

      {/* Top Selling Items Table */}
      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">Top Selling Items</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginate(topSellingItems, currentPage).map((product) => (
            <tr key={product._id} className="hover:bg-gray-100 cursor-pointer">
              <td className="py-2 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">{product.category?.name || 'General'}</td>
              <td className="py-2 px-4 border">${product.unit_price.toFixed(2)}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleProductClick(product)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {renderPagination(topSellingItems.length, currentPage, setCurrentPage)}

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex flex-row space-x-6">
              {/* Product Image */}
              {selectedProduct.images_path.length > 0 && (
                <img
                  src={selectedProduct.images_path[0]}
                  alt={selectedProduct.name}
                  className="w-64 h-64 object-cover rounded-lg"
                />
              )}
              
              {/* Product Details */}
              <div>
                <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>
                <p><strong>Category:</strong> {selectedProduct.category?.name || 'General'}</p>
                <p><strong>Price:</strong> ${selectedProduct.unit_price.toFixed(2)}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
                <p><strong>Color:</strong> {selectedProduct.color}</p>
                <p><strong>Size:</strong> {selectedProduct.size}</p>
                <p><strong>Total Sales:</strong> {selectedProduct.total_sales}</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingAndTopSelling;
