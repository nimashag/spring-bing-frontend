import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  metadata: { color: string; size: string };
  unit_price: number;
  description: string;
  images_path: string;
  category: string;
}

const TopSellingItems: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopSellingItems = async () => {
      try {
        // Fetch product IDs
        const response = await axios.get('http://localhost:3001/api/top-selling-products');
        const productIds = response.data.productIds;

        // Fetch detailed products by product IDs
        const productDetails = await axios.post('http://localhost:3001/api/products-by-ids', { productIds });
        setProducts(productDetails.data);
      } catch (err) {
        setError('Error fetching top-selling items.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Selling Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <img
              src={product.images_path}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <div className="mt-2">
                <span className="text-gray-800 font-semibold">Price: </span>
                {product.unit_price.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingItems;
