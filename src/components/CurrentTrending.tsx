import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { Link } from "react-router-dom";

interface TrendingProduct {
  product_id: string;
  name: string;
  color: string;
  size: string;
  category: string;
  unit_price: number;
  description: string;
  images_path: string[];
  total_sales: number;
}

const TrendingProducts: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/trending-products');
        setTrendingProducts(response.data);
      } catch (err) {
        setError('Error fetching trending products.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    // <div className="container mx-auto py-10">
    //   <h2 className="text-3xl font-bold text-center mb-8">Trending Products</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {trendingProducts.map(product => (
    //       <div key={product.product_id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow">
    //         <img 
    //           src={product.images_path[0] || '/placeholder.jpg'} 
    //           alt={product.name} 
    //           className="w-full h-48 object-cover"
    //         />
    //         <div className="p-4">
    //           <h3 className="text-xl font-bold">{product.name}</h3>
    //           <p className="text-gray-600">Category: {product.category}</p>
    //           <p className="text-gray-600">Color: {product.color} | Size: {product.size}</p>
    //           <p className="text-green-600 font-bold mt-2">{product.unit_price}</p>
    //           <p className="text-gray-700 mt-2">{product.description}</p>
    //           <p className="text-sm text-gray-400 mt-1">Total Sales: {product.total_sales}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="container mx-auto py-10">
  <h2 className="text-3xl font-bold text-center mb-8">Trending Products</h2>
  <div className="grid gap-5 my-12 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
    {trendingProducts.map((product) => (
      <div key={product.product_id} className="text-center">
        <Link to={`/product/${product.product_id}`}>
          <div className="relative group overflow-hidden">
            <img
              src={product.images_path[0] || '/placeholder.jpg'}
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
          <p className="text-gray-500 font-regular">LKR {product.unit_price}</p>
        </Link>
        <p className="text-sm text-gray-400 mt-1">Total Sales: {product.total_sales}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default TrendingProducts;
