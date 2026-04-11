import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define TypeScript interfaces for your data
interface SalesForecastData {
    product_id: string;
    predicted_sales: number;
}

interface ProductGrowthData {
    product_id: string;
    sales_growth: number;
}

interface NegativeGrowthProduct {
    product_id: string;
    size: string;
    color: string;
    sales_growth: number;
    predicted_growth: number;
}

const AdminDashboard: React.FC = () => {
    const [salesForecast, setSalesForecast] = useState<SalesForecastData[]>([]);
    const [productGrowth, setProductGrowth] = useState<ProductGrowthData[]>([]);
    const [negativeGrowthProducts, setNegativeGrowthProducts] = useState<NegativeGrowthProduct[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch Sales Forecast
        axios.get('/api/sales_forecast')
            .then(response => {
                console.log('Sales Forecast Data:', response.data);
                setSalesForecast(response.data);
            })
            .catch(error => {
                console.error("Error fetching sales forecast:", error);
                setError("Error fetching sales forecast");
            });

        // Fetch Product Growth
        axios.get('/api/product_growth')
            .then(response => {
                console.log('Product Growth Data:', response.data);
                setProductGrowth(response.data);
            })
            .catch(error => {
                console.error("Error fetching product growth:", error);
                setError("Error fetching product growth");
            });

        // Fetch Negative Growth Products
        axios.get('/api/negative_growth_products')
            .then(response => {
                console.log('Negative Growth Products Data:', response.data);
                setNegativeGrowthProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching negative growth products:", error);
                setError("Error fetching negative growth products");
            });
    }, []);

    return (
        <div className="p-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Sales Forecast</h2>
                <div>
                    {salesForecast.length > 0 ? (
                        <ul>
                            {salesForecast.map((item) => (
                                <li key={item.product_id}>
                                    Product ID: {item.product_id}, Predicted Sales: {item.predicted_sales}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No sales forecast data available.</p>
                    )}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Product Growth</h2>
                <div>
                    {productGrowth.length > 0 ? (
                        <ul>
                            {productGrowth.map((item) => (
                                <li key={item.product_id}>
                                    Product ID: {item.product_id}, Sales Growth: {item.sales_growth}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No product growth data available.</p>
                    )}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Negative Growth Products</h2>
                <div>
                    {negativeGrowthProducts.length > 0 ? (
                        <ul>
                            {negativeGrowthProducts.map((item) => (
                                <li key={item.product_id}>
                                    Product ID: {item.product_id}, Size: {item.size}, Color: {item.color}, Sales Growth: {item.sales_growth}, Predicted Growth: {item.predicted_growth}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No negative growth products data available.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AdminDashboard;
