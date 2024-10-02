import React, { useEffect, useRef, useState } from "react";
import { orderChartData } from "../../../types/types.ts";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import currencyFormatter from 'currency-formatter';
import SidebarComp from "../../../dashboard/SidebarComp.tsx";

const FinanceReport: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const [chartData, setChartData] = useState<orderChartData>({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  });

  const [MonthlyIncome, setMonthlyIncome] = useState<orderChartData>({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  });

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const year = selectedYear; // temp

        const response = await axios.get(
          `http://localhost:3000/order/get-orders-on-year`,
          { params: { year } }
        );

        response.data.map((order) => {
          //console.log(typeof new Date(order.purchase_date).getMonth())
          //console.log(typeof 9)
          //console.log(new Date(order.purchase_date).getMonth() == 9) // getting false
          if (new Date(order.purchase_date).getMonth() === 0) {
            console.log(order.total_price);
            setChartData((prevState) => ({
              ...prevState,
              january: prevState.january + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              january: prevState.january + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 1) {
            setChartData((prevState) => ({
              ...prevState,
              february: prevState.february + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              february: prevState.february + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 2) {
            setChartData((prevState) => ({
              ...prevState,
              march: prevState.march + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              march: prevState.march + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 3) {
            setChartData((prevState) => ({
              ...prevState,
              april: prevState.april + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              april: prevState.april + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 4) {
            setChartData((prevState) => ({
              ...prevState,
              may: prevState.may + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              may: prevState.may + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 5) {
            setChartData((prevState) => ({
              ...prevState,
              june: prevState.june + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              june: prevState.june + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 6) {
            setChartData((prevState) => ({
              ...prevState,
              july: prevState.july + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              july: prevState.july + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 7) {
            setChartData((prevState) => ({
              ...prevState,
              august: prevState.august + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              august: prevState.august + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 8) {
            setChartData((prevState) => ({
              ...prevState,
              september: prevState.september + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              september: prevState.september + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 9) {
            setChartData((prevState) => ({
              ...prevState,
              october: prevState.october + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              october: prevState.october + order.total_price,
            }));
          } else if (new Date(order.purchase_date).getMonth() === 10) {
            setChartData((prevState) => ({
              ...prevState,
              november: prevState.november + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              november: prevState.november + order.total_price,
            }));
          } else {
            setChartData((prevState) => ({
              ...prevState,
              december: prevState.december + 1,
            }));
            setMonthlyIncome((prevState) => ({
              ...prevState,
              december: prevState.december + order.total_price,
            }));
          }
        });
        getMaxMonthlyIncome();
        getHighestOrderMonth();
        //console.log(response.data.map(order => typeof new Date(order.purchase_date).getMonth()));
        //console.log("september",chartData.september);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, [selectedYear]);

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

  const getMaxMonthlyIncome = () => {
    const incomeValues = Object.values(MonthlyIncome);
    const highest = Math.max(...incomeValues);
    return Math.ceil(highest);
  };

  const getHighestOrderMonth = () => {
    const orders = Object.values(chartData);
    const months = Object.keys(chartData);
    const max = Math.max(...orders);
    const maxIndex = orders.indexOf(max);
    return months[maxIndex];
  };

  // BarChat for number of orders

  const orderData = {
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
        label: "Orders",
        data: [
          chartData.january,
          chartData.february,
          chartData.march,
          chartData.april,
          chartData.may,
          chartData.june,
          chartData.july,
          chartData.august,
          chartData.september,
          chartData.october,
          chartData.november,
          chartData.december,
        ],

        backgroundColor: "rgb(7,175,175)",
        borderColor: "rgba(7,175,175)",
        borderWidth: 1,
      },
    ],
  };
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Orders",
      },
    },
  };

  //Line graph of total income for each month

  const incomeData = {
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
        label: "Total Income",
        data: [
          MonthlyIncome.january,
          MonthlyIncome.february,
          MonthlyIncome.march,
          MonthlyIncome.april,
          MonthlyIncome.may,
          MonthlyIncome.june,
          MonthlyIncome.july,
          MonthlyIncome.august,
          MonthlyIncome.september,
          MonthlyIncome.october,
          MonthlyIncome.november,
          MonthlyIncome.december,
        ],

        backgroundColor: "rgb(11,22,234)",
        borderColor: "rgb(10,20,179)",
        borderWidth: 1,
      },
    ],
  };
  const incomeLineGraphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Income",
      },
    },
  };

  const setGraphYear = async (year: number) => {
    try {
      setChartData({
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0,
      });
      setMonthlyIncome({
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0,
      });

      await setSelectedYear(year);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="dashboard-layout">
      <SidebarComp />

      <div className="main-content">
      <h2 className="text-3xl font-bold">Finance Report</h2>
      <br />
      <div>
        <select
          className="border border-black p-2"
          value={selectedYear}
          onChange={(e) => setGraphYear(parseInt(e.target.value))}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>

      <div ref={printRef}>
        <div className="p-4 mt-5">
          <Bar data={orderData} options={barChartOptions} />
        </div>

        <div className="p-4 mt-12">
          <Line data={incomeData} options={incomeLineGraphOptions} />
        </div>

        <div className="m-4 grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="min-h-[102px] rounded-lg border-2 border-black">
            <h3 className="font-bold text-lg p-2">
              Highest Income in the year
            </h3>
            <h5 className="text-6xl text-center p-4">
              {currencyFormatter.format(getMaxMonthlyIncome(),{ code: 'USD' })}
            </h5>
          </div>
          <div className="min-h-[102px] rounded-lg border-2 border-black">
            <h3 className="font-bold text-lg p-2">
              The month with Highest number of orders
            </h3>
            <h5 className="text-6xl text-center p-4">
              {getHighestOrderMonth()}
            </h5>
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
    </>
  );
};

export default FinanceReport;
