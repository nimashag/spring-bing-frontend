import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
import "chart.js/auto"; // Required for chart rendering
import SidebarComp from "../dashboard/SidebarComp";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface SalesForecast {
  product_id: string;
  product_name: string;
  color: string;
  size: string;
  predicted_sales: number;
  total_sales_current_month: number;
  growth_rate: number | null;
}

const SalesForecasting: React.FC = () => {
  const [forecastData, setForecastData] = useState<SalesForecast[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/sales-forecasting"
        );
        setForecastData(response.data);
      } catch (error) {
        console.error("Error fetching sales forecast data:", error);
      }
    };

    fetchForecastData();
  }, []);

  // Prepare data for graphs
  const productNames = forecastData.map((item) => item.product_name);
  const predictedSales = forecastData.map((item) => item.predicted_sales);
  const actualSales = forecastData.map(
    (item) => item.total_sales_current_month
  );
  const growthRates = forecastData.map((item) => item.growth_rate || 0);
  const totalSales = forecastData.map((item) => item.total_sales_current_month);

  // Calculate total sales for pie chart
  const totalSalesSum = totalSales.reduce((acc, val) => acc + val, 0);

  //PDF download function
  const handlePrintPDF = async () => {
    const element = printRef.current;

    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the PDF and handle multiple pages
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("report.pdf");
    }
  };

  return (
    <div>
      <SidebarComp />

      <div className="main-content">
        <div ref={printRef}>
          <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Sales Forecasting Dashboard
            </h2>

            {/* Sales Forecast Table */}
            <table className="min-w-full bg-white border border-gray-300 rounded-lg mb-8">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Product Name</th>
                  <th className="py-2 px-4 border">Predicted Sales</th>
                  <th className="py-2 px-4 border">Current Month Sales</th>
                  <th className="py-2 px-4 border">Growth Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((item) => (
                  <tr key={item.product_id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{item.product_name}</td>
                    <td className="py-2 px-4 border">
                      {item.predicted_sales.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.total_sales_current_month}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.growth_rate ? item.growth_rate.toFixed(2) : "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Predicted vs Actual Sales Bar Chart */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">
                Predicted vs Actual Sales
              </h3>
              <Bar
                data={{
                  labels: productNames,
                  datasets: [
                    {
                      label: "Predicted Sales",
                      data: predictedSales,
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                    {
                      label: "Actual Sales (Current Month)",
                      data: actualSales,
                      backgroundColor: "rgba(153, 102, 255, 0.6)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Products",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Sales Quantity",
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>

            {/* Sales Growth Rate Line Chart */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Growth Rate (%)</h3>
              <Line
                data={{
                  labels: productNames,
                  datasets: [
                    {
                      label: "Growth Rate (%)",
                      data: growthRates,
                      fill: false,
                      borderColor: "rgba(255, 99, 132, 0.8)",
                      backgroundColor: "rgba(255, 99, 132, 0.8)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Products",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Growth Rate (%)",
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>

            {/* Sales Distribution Pie Chart */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">
                Sales Distribution by Product
              </h3>
              <Pie
                data={{
                  labels: productNames,
                  datasets: [
                    {
                      label: "Total Sales",
                      data: totalSales.map(
                        (sales) => (sales / totalSalesSum) * 100
                      ),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem: any) =>
                          `${tooltipItem.label}: ${tooltipItem.raw.toFixed(
                            2
                          )}%`,
                      },
                    },
                  },
                }}
              />
            </div>

            {/* Sales Comparison Radar Chart */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">
                Sales Comparison (Predicted vs Actual vs Growth Rate)
              </h3>
              <Radar
                data={{
                  labels: productNames,
                  datasets: [
                    {
                      label: "Predicted Sales",
                      data: predictedSales,
                      backgroundColor: "rgba(75, 192, 192, 0.3)",
                      borderColor: "rgba(75, 192, 192, 1)",
                    },
                    {
                      label: "Actual Sales",
                      data: actualSales,
                      backgroundColor: "rgba(153, 102, 255, 0.3)",
                      borderColor: "rgba(153, 102, 255, 1)",
                    },
                    {
                      label: "Growth Rate (%)",
                      data: growthRates,
                      backgroundColor: "rgba(255, 99, 132, 0.3)",
                      borderColor: "rgba(255, 99, 132, 1)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    r: {
                      beginAtZero: true,
                      pointLabels: {
                        display: true,
                        font: {
                          size: 12,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <button
          className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
          onClick={handlePrintPDF}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default SalesForecasting;
