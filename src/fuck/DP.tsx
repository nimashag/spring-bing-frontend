import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa'; // Import eye icon
import { Bar } from 'react-chartjs-2'; // Import the Bar chart from react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface PriceSuggestion {
  product_id: string;
  product_name: string;
  current_price: number;
  suggested_price: number;
  stock_status: string;
  date_suggested: string;
}

const PriceSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<PriceSuggestion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const suggestionsPerPage = 10;
  const [selectedProduct, setSelectedProduct] = useState<PriceSuggestion | null>(null);
  const [newPrice, setNewPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPriceSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/price-suggestions');
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching price suggestions:', error);
      }
    };

    fetchPriceSuggestions();
  }, []);

  // Pagination logic
  const indexOfLastSuggestion = currentPage * suggestionsPerPage;
  const indexOfFirstSuggestion = indexOfLastSuggestion - suggestionsPerPage;
  const currentSuggestions = suggestions.slice(indexOfFirstSuggestion, indexOfLastSuggestion);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleProductClick = (suggestion: PriceSuggestion) => {
    setSelectedProduct(suggestion);
    setNewPrice(null); // Reset new price input
  };

  const handleAcceptNewPrice = async () => {
    if (selectedProduct && newPrice) {
      try {
        await axios.put(`http://localhost:3001/api/${selectedProduct.product_id}`, {
          newPrice
        });
        alert('Price updated successfully!');
        setSelectedProduct(null); // Close the modal
      } catch (error) {
        console.error('Error updating price:', error);
      }
    }
  };

  // Sample data for charts
  const chartData = {
    labels: suggestions.map(s => s.product_name),
    datasets: [
      {
        label: 'Current Price',
        data: suggestions.map(s => s.current_price),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Suggested Price',
        data: suggestions.map(s => s.suggested_price),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Price Suggestions</h2>

      {/* Price Suggestion Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Product Name</th>
            <th className="py-2 px-4 border">Current Price</th>
            <th className="py-2 px-4 border">Suggested Price</th>
            <th className="py-2 px-4 border">Stock Status</th>
            <th className="py-2 px-4 border">Date Suggested</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSuggestions.map((suggestion) => (
            <tr key={suggestion.product_id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{suggestion.product_name}</td>
              <td className="py-2 px-4 border">{suggestion.current_price.toFixed(2)}</td>
              <td className="py-2 px-4 border">{suggestion.suggested_price.toFixed(2)}</td>
              <td className="py-2 px-4 border">{suggestion.stock_status}</td>
              <td className="py-2 px-4 border">{new Date(suggestion.date_suggested).toLocaleDateString()}</td>
              <td className="py-2 px-4 border">
                <button 
                  onClick={() => handleProductClick(suggestion)} 
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  <FaEye className="inline-block mr-1" /> {/* Using eye icon */}
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mb-4">
        {Array.from({ length: Math.ceil(suggestions.length / suggestionsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-gray-400 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Price Comparison</h3>
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={400} />
      </div>

      {/* Product Detail Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4">{selectedProduct.product_name} Details</h3>
            <div>
              <p>Current Price: {selectedProduct.current_price.toFixed(2)}</p>
              <p>Suggested Price: {selectedProduct.suggested_price.toFixed(2)}</p>
              <p>Stock Status: {selectedProduct.stock_status}</p>
              <p>Date Suggested: {new Date(selectedProduct.date_suggested).toLocaleDateString()}</p>
              <input
                type="number"
                placeholder="New Price"
                value={newPrice || ''}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="border p-2 mt-2"
              />
              <button onClick={handleAcceptNewPrice} className="bg-green-500 text-white px-2 py-1 mt-2 rounded">
                Accept New Price
              </button>
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="bg-red-500 text-white px-2 py-1 mt-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSuggestions;
