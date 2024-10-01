import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "../../index.css";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import '../../dashboard/DashboardLayout.css'

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
    html2canvas(document.getElementById("order-summary") as HTMLElement).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Set text color (e.g., red)
        doc.setTextColor(0, 139, 139); // RGB for red
        doc.text("Orders", doc.internal.pageSize.getWidth() / 2, 40, {
          align: "center",
        }); // Center title

        doc.addImage(imgData, "PNG", 40, 60, 520, 425);
        doc.addPage(); // New page for sales trends

        // Capture sales trends after a short delay
        setTimeout(() => {
          // Capture sales trends
          html2canvas(
            document.getElementById("sales-trends") as HTMLElement
          ).then((canvas2) => {
            const imgData2 = canvas2.toDataURL("image/png");
            doc.setTextColor(0, 139, 139); // Set text color
            doc.text("Sales Trends", doc.internal.pageSize.getWidth() / 2, 40, {
              align: "center",
            }); // Center title
            doc.addImage(imgData2, "PNG", 40, 60, 520, 300);
            doc.addPage(); // New page for the pie chart

            // Capture pie chart
            html2canvas(
              document.getElementById("order-status-pie") as HTMLElement
            ).then((canvas3) => {
              const imgData3 = canvas3.toDataURL("image/png");
              doc.setTextColor(0, 139, 139); // Set text color
              doc.text(
                "Order Status Pie Chart",
                doc.internal.pageSize.getWidth() / 2,
                40,
                { align: "center" }
              ); // Center title
              doc.addImage(imgData3, "PNG", 40, 60, 520, 300);
              doc.save("Order_Summary_and_Sales_Trends.pdf"); // Save PDF
            });
          });
        }, 500); // Delay to ensure charts are rendered
      }
    );
  };

  return (
    <div className="flex h-screen ">
    {/* Sidebar */}
    <aside className="sidebar">
      <div className="logo">
        <h2>Admin Dashboard</h2>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/admin/dash">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/manage-products">Manage Products</Link>
          </li>
          <li>
            <Link to="/admin/stat-products">Stock Summary</Link>
          </li>
          <li>
            <Link to="">Orders</Link>
          </li>
          <li>
            <Link to="/admin/manage-reviews">Manage Reviews</Link>
          </li>
          <li>
            <Link to="/admin/manage-faq">Manage FAQs</Link>
          </li>
          <li>
            <Link to="">Finance Report</Link>
          </li>
          <li>
            <Link to="">Profile</Link>
          </li>
          <li>
            <Link to="">Logout</Link>
          </li>
        </ul>
      </nav>
    </aside>

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
              <button onClick={resetCalendarFilter} className="text-gray-500">
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
            <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
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
            <p className="text-3xl font-bold text-red-600">{packingOrders}</p>
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
