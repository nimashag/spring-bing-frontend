import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TrendingProduct {
  product_id: string;
  size: string;
  color: string;
  predicted_growth: number;
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  images_path: string;
}

const Trending: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        // Fetch trending products
        const trendingResponse = await axios.get('http://localhost:5000/api/trending_products');
        const trendingData: TrendingProduct[] = trendingResponse.data;
        setTrendingProducts(trendingData);

        // Fetch product details for each trending product
        const productIds = trendingData.map((product) => product.product_id);

        // Fetch product details in parallel
        const productDetailRequests = productIds.map((id) =>
          axios.get(`http://localhost:5000/api/products/${id}`)
        );

        const productDetailResponses = await Promise.all(productDetailRequests);
        const productDetailData = productDetailResponses.map((response) => response.data);

        setProductDetails(productDetailData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products data');
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Trending Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productDetails.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white shadow-md">
            <img
              src={product.images_path[0]}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-500 font-semibold mb-2">{product.unit_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
