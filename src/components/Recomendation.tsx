import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  images_path: string;
}

interface Recommendation {
  id: string;
  user_id: string;
  recommendations: string[];
}

const RecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('profile') || '{}').id;

        const response = await axios.get<Recommendation>(`/api/recommendations/${userId}`);
        const productIds = response.data.recommendations;

        if (productIds && productIds.length > 0) {
          const productPromises = productIds.map((id) => axios.get<Product>(`/api/products/${id}`));
          const productResponses = await Promise.all(productPromises);
          const fetchedProducts = productResponses.map((res) => res.data);

          setRecommendations(fetchedProducts);
        } else {
          setError('No recommendations found.');
        }
      } catch (err) {
        setError('An error occurred while fetching recommendations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4"> Recommendations </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {recommendations.map((product) => (
        <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
          <img src={product.images_path[0]} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
          <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.unit_price.toFixed(2)}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default RecommendationsPage;
