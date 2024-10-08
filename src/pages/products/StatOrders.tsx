import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "../../index.css";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "../../dashboard/DashboardLayout.css";
import SidebarComp from "../../dashboard/SidebarComp.tsx";
import logoImgPath from '../../assets/logospringbing.jpeg'

interface Order {
  _id: string;
  orderProducts: {
    product_id: string;
    quantity: number;
    color: string;
    size: string;
  }[];
  purchase_date: string;
  billing_address: string;
  total_price: number;
  order_status: string;
}

const StatOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Initialize as empty array
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // For date filter
  const [salesTrendsData, setSalesTrendsData] = useState<any>({
    labels: [],
    datasets: [],
  });

  // Simulate API data fetching
  useEffect(() => {
    // Order Status

    fetch("http://localhost:3000/order/getAllOrders")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data || []);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

    // Sales Trends Data
    setTimeout(() => {
      setSalesTrendsData({
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Sales Trends",
            data: [50, 75, 60, 115, 110, 175, 146, 180, 176, 170, 155, 185], // Mock data for sales trends
            fill: false,
            borderColor: "#42A5F5",
          },
        ],
      });
    }, 1000);
  }, []);

  // Filter by date
  const filteredOrders = orders.filter(
    (order) =>
      selectedDate === null ||
      (new Date(order.purchase_date).getMonth() === selectedDate.getMonth() &&
        new Date(order.purchase_date).getFullYear() ===
          selectedDate.getFullYear())
  );

  // Function to reset the calendar filter
  const resetCalendarFilter = () => {
    setSelectedDate(null); // Reset to show all orders
  };

  //Calculate summary statistics for the orders
  const totalOrders = filteredOrders.length;
  const preconfirmedOrders = filteredOrders.filter(
    (order) => order.order_status === "pre-confirmed"
  ).length;
  const confirmedOrders = filteredOrders.filter(
    (order) => order.order_status === "confirmed"
  ).length;
  const processingOrders = filteredOrders.filter(
    (order) => order.order_status === "processing"
  ).length;
  const packingOrders = filteredOrders.filter(
    (order) => order.order_status === "packing"
  ).length;
  const ondeliveryOrders = filteredOrders.filter(
    (order) => order.order_status === "on-delivery"
  ).length;
  const deliveredOrders = filteredOrders.filter(
    (order) => order.order_status === "delivered"
  ).length;

  // Pie chart options for customizing size
  const pieChartOptions = {
    maintainAspectRatio: false, // Allows control over chart size
    responsive: true,
  };

  type OrderStatus =
    | "pre-confirmed"
    | "confirmed"
    | "processing"
    | "packing"
    | "on-delivery"
    | "delivered";

  const orderStatusCounts: Record<OrderStatus, number> = {
    "pre-confirmed": preconfirmedOrders,
    confirmed: confirmedOrders,
    processing: processingOrders,
    packing: packingOrders,
    "on-delivery": ondeliveryOrders,
    delivered: deliveredOrders,
  };

  const pieData = {
    labels: Object.keys(orderStatusCounts),
    datasets: [
      {
        data: Object.values(orderStatusCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const printPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    // Capture the order summary
    html2canvas(document.getElementById("order-summary") as HTMLElement, {
      scale: 2, // Higher scale for better quality
      backgroundColor: null, // Ensure no background color
      width: document.getElementById("order-summary")?.scrollWidth, // Exact width
      height: document.getElementById("order-summary")?.scrollHeight, // Exact height
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      // Add the header from generatePDF
      // Set the logo, title, and other header elements
      const logoWidth = 25;
      const logoHeight = 25;
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.addImage(logoImgPath, 'PNG', 60, 20, logoWidth, logoHeight); // Adjust positioning as needed
  
      // Set font for the title
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(33, 37, 41); // Dark color for title
      doc.text("Orders", pageWidth / 2, 40, { align: "center" }); // Adjust positioning as needed
  
      // Report type and date
      doc.setFontSize(10);
      doc.setTextColor(100); // Lighter color for subtitle
      doc.text("Report Category: Orders", 450, 30); // Adjust position as needed
      doc.text("Contact: +94 75 123 546", 450, 40); // Adjust position as needed
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 450, 50); // Add date on the header
  
      // Draw a line under the header
      doc.setDrawColor(100);
      doc.line(40, 55, 570, 55); // Adjust position based on layout
  
      // Adjust the image size to avoid overflow and neatly fit within the page
      const imgWidth = 520;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 40, 70, imgWidth, imgHeight); // Adjust the y position to be below the header
  
      // New page for sales trends
      doc.addPage();
  
      // Capture the sales trends after ensuring the first page is completed
      html2canvas(document.getElementById("sales-trends") as HTMLElement, {
        scale: 2, // Ensure high-quality canvas rendering
        backgroundColor: null,
        width: document.getElementById("sales-trends")?.scrollWidth,
        height: document.getElementById("sales-trends")?.scrollHeight,
      }).then((canvas2) => {
        const imgData2 = canvas2.toDataURL("image/png");
  
        // Add the header again for the second page
        doc.addImage(logoImgPath, 'PNG', 60, 20, logoWidth, logoHeight);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(33, 37, 41);
        doc.text("Sales Trends", pageWidth / 2, 40, { align: "center" });
  
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Report Category: Sales", 425, 30);
        doc.text("Contact: +94 75 123 546", 425, 40);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 425, 50);
  
        doc.setDrawColor(100);
        doc.line(40, 55, 570, 55);
  
        // Adjust the image size for sales trends section
        const imgWidth2 = 520;
        const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;
        doc.addImage(imgData2, "PNG", 40, 70, imgWidth2, imgHeight2);
  
        // Save the PDF file
        doc.save("Order_Summary_and_Sales_Trends.pdf");
  
      });
    });
  };
  

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <SidebarComp />

      {/* Main Content */}
      <main className="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center mb-4">
            {/* Button Group */}
            <div className="flex gap-4">
              <Link to="/admin/stat-products">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg  px-20 py-5 text-center me-2 mb-2"
                >
                  Stock Summary
                </button>
              </Link>
              <Link to="/admin/stat-orders">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg  px-20 py-5 text-center me-2 mb-2"
                >
                  Order Summary
                </button>
              </Link>
            </div>
          </div>

          {/* Add Print Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={printPDF}
              className="text-gray-900 bg-gradient-to-r from-blue-200 to-blue-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-500 font-medium rounded-lg px-6 py-2 text-center"
            >
              Download PDF
            </button>
          </div>

          {/* Summary Form */}
          <div
            className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8"
            id="order-summary"
          >
            <div className="flex items-center justify-between mb-4 mt-6">
              <h3 className="text-4xl font-semibold mb-6 ">Order Summary</h3>

              <div className="relative w-64 mb-4 flex items-center gap-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
                  placeholderText="Select Month/Year"
                />
                <div className="absolute top-0 left-0 mt-2.5 ml-4 text-gray-500">
                  <FaCalendarAlt size="20px" />
                </div>
                {selectedDate && (
                  <button
                    onClick={resetCalendarFilter}
                    className="text-gray-500"
                  >
                    <FaTimes size="20px" />
                  </button>
                )}
              </div>
            </div>

            {/* Section 1: Total Orders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Total Orders
                </h4>
                <p className="text-3xl font-bold text-blue-600">
                  {totalOrders}
                </p>
              </div>
            </div>

            {/* Section 2: Confirmed, pre-confirmed, Processing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Confirmed Orders
                </h4>
                <p className="text-3xl font-bold text-green-600">
                  {confirmedOrders}
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Pre-Confirmed Orders
                </h4>
                <p className="text-3xl font-bold text-green-600">
                  {preconfirmedOrders}
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Processing Orders
                </h4>
                <p className="text-3xl font-bold text-yellow-600">
                  {processingOrders}
                </p>
              </div>
            </div>

            {/* Section 3: Packing Orders, On-Delivery, Delivered Orders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Packing Orders
                </h4>
                <p className="text-3xl font-bold text-red-600">
                  {packingOrders}
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  On-Delivery Orders
                </h4>
                <p className="text-3xl font-bold text-orange-600">
                  {ondeliveryOrders}
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                <h4 className="text-lg font-semibold text-gray-700">
                  Delivered Orders
                </h4>
                <p className="text-3xl font-bold text-teal-600">
                  {deliveredOrders}
                </p>
              </div>
            </div>

            {/* Order Status Pie Chart */}
            <div
              className="bg-white shadow-lg rounded-lg p-6"
              id="order-status-pie"
            >
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Order Status
              </h2>
              <div className="flex justify-center">
                {/* Wrapper div with fixed size for smaller chart */}
                <div
                  className="relative"
                  style={{ width: "500px", height: "500px" }}
                >
                  <Pie data={pieData} options={pieChartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Sales Trends Line Chart */}
          <div className="bg-white shadow rounded-lg p-6" id="sales-trends">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Sales Trends
            </h2>
            <Line data={salesTrendsData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatOrders;
