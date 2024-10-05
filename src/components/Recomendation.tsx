import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedProducts: React.FC = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const token = localStorage.getItem('token');
      const profile = localStorage.getItem('profile');

      if (token && profile) {
        const user = JSON.parse(profile);
        try {
          const response = await axios.get(`http://localhost:3001/api/recommendations/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const productIds = response.data.map((product: any) => product._id);
          const productsResponse = await axios.post(`http://localhost:3001/api/products-by-ids`, {
            productIds,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setRecommendedProducts(productsResponse.data);
          console.log("Fetched recommended products:", productsResponse.data); // Log fetched products

        } catch (err) {
          console.error('Error fetching recommendations:', err);
          setError('Failed to load recommendations.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('User not authenticated.');
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {recommendedProducts.length > 0 ? (
        recommendedProducts.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Check if imageUrl exists in metadata */}
            {product.images_path && product.images_path.length > 0 ? (
              <img src={product.images_path[0]} alt={product.name} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image not available</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              {/* Check if unit_price exists before formatting */}
              <p className="mt-2 text-xl font-bold">
                {product.unit_price !== undefined 
                  ? `$${product.unit_price.toFixed(2)}`
                  : 'Price not available'}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>No recommended products available. make some purchases</div>
      )}
    </div>
  );
};

export default RecommendedProducts;
