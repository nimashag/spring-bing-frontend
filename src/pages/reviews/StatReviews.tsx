import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface Review {
  _id: string;
  title: string;
  description: string;
  rating: number;
  date: string;
  status: string;
  images_path?: string[];
}

// Register the ChartJS components for the graph
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | ''>(''); // For rating filter
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // For date filter

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data || []); 
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  // Filter by rating and date
  const filteredReviews = reviews
    .filter(review => 
      (statusFilter === '' || review.status === statusFilter) &&
      (ratingFilter === '' || review.rating === ratingFilter) &&
      (selectedDate === null || 
        new Date(review.date).getMonth() === selectedDate.getMonth() && 
        new Date(review.date).getFullYear() === selectedDate.getFullYear())
    );

  // Function to reset the calendar filter
  const resetCalendarFilter = () => {
    setSelectedDate(null); // Reset to show all reviews
  };

  // Calculate summary statistics for the filtered reviews
  const totalReviews = filteredReviews.length;
  const totalRatings = filteredReviews.reduce((acc, review) => acc + review.rating, 0);
  const avgRating = totalReviews > 0 ? (totalRatings / totalReviews).toFixed(2) : 'N/A';
  const pendingReviews = filteredReviews.filter(review => review.status === 'pending').length;
  const solvedReviews = filteredReviews.filter(review => review.status === 'solved').length;
  const onProgressReviews = filteredReviews.filter(review => review.status === 'onprogress').length;

  // New criteria for positive, neutral, and bad reviews
  const positiveReviews = filteredReviews.filter(review => review.rating >= 4).length;
  const neutralReviews = filteredReviews.filter(review => review.rating === 3).length;
  const badReviews = filteredReviews.filter(review => review.rating <= 2).length;

  // Monthly Data for the Reviews Graphs
  const positiveReviewsByMonth = Array(12).fill(0);
  const neutralReviewsByMonth = Array(12).fill(0);
  const badReviewsByMonth = Array(12).fill(0);

  reviews.forEach(review => {
    const reviewDate = new Date(review.date);
    if (review.rating >= 4) {
      positiveReviewsByMonth[reviewDate.getMonth()]++;
    } else if (review.rating <= 2) {
      badReviewsByMonth[reviewDate.getMonth()]++;
    } else if (review.rating === 3) {
      neutralReviewsByMonth[reviewDate.getMonth()]++;
    }
  });

  // Graph data and configuration
  const lineChartData = (data: number[], label: string, borderColor: string, backgroundColor: string) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label,
        data,
        borderColor,
        backgroundColor,
        fill: true,
      }
    ],
  });

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="px-4 my-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6">

        {/* Filter and Table */}
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="text-3xl font-bold">Review Statistics</h2>

          <div className="flex items-center gap-4">
            {/* Status Filter */}
            <div className="mb-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-gray-500 h-10 pl-4 pr-4 rounded-full shadow-sm w-48 border border-gray-300"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="solved">Solved</option>
                <option value="onprogress">On Progress</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="text-gray-500 h-10 pl-4 pr-4 rounded-full shadow-sm w-48 border border-gray-300"
              >
                <option value="">All Ratings</option>
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>{`Rating: ${rating}`}</option>
                ))}
              </select>
            </div>

            {/* Date Filter (Calendar Picker) */}
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
        </div>
      </div>

      {/* Summary Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4">Monthly Summary</h3>
        
        {/* 1st Section */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-white shadow-sm rounded-lg">
            <h4 className="text-lg font-semibold">Total Reviews</h4>
            <p className="text-xl">{totalReviews}</p>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-lg">
            <h4 className="text-lg font-semibold">Average Rating</h4>
            <p className="text-xl">{avgRating}</p>
          </div>
        </div>
        
        {/* 2nd Section */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-white shadow-sm rounded-lg">
            <h4 className="text-lg font-semibold">Solved Reviews</h4>
            <p className="text-xl">{solvedReviews}</p>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-lg">
            <h4 className="text-lg font-semibold">Pending Reviews</h4>
            <p className="text-xl">{pendingReviews}</p>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-lg">
            <h4 className="text-lg font-semibold">On Progress Reviews</h4>
            <p className="text-xl">{onProgressReviews}</p>
          </div>
        </div>
        
        {/* 3rd Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow-sm rounded-lg">
            <h4 className="text-lg font-semibold">Positive Reviews (4 & 5)</h4>
            <p className="text-xl">{positiveReviews}</p>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-lg">
            <h4 className="text-lg font-semibold">Neutral Reviews (3)</h4>
            <p className="text-xl">{neutralReviews}</p>
          </div>
          <div className="p-4 bg-white shadow-sm rounded-lg">
            <h4 className="text-lg font-semibold">Bad Reviews (1 & 2)</h4>
            <p className="text-xl">{badReviews}</p>
          </div>
        </div>
      </div>

      {/* Graphs for Positive, Neutral, and Bad Reviews */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h4 className="text-xl font-semibold mb-4">Positive Reviews (4 & 5)</h4>
          <Line data={lineChartData(positiveReviewsByMonth, 'Positive Reviews', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 0.2)')} options={lineChartOptions} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h4 className="text-xl font-semibold mb-4">Negative Reviews (1 & 2)</h4>
          <Line data={lineChartData(badReviewsByMonth, 'Negative Reviews', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 0.2)')} options={lineChartOptions} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h4 className="text-xl font-semibold mb-4">Neutral Reviews (3)</h4>
          <Line data={lineChartData(neutralReviewsByMonth, 'Neutral Reviews', 'rgba(255, 206, 86, 1)', 'rgba(255, 206, 86, 0.2)')} options={lineChartOptions} />
        </div>
      </div>

      {/* Reviews Table */}
      <div className="flex justify-center items-center min-h-screen">
          <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, index) => (
                  <tr key={review._id} className="bg-white hover:bg-gray-100 transition duration-300">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {review.title}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {review.rating}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(review.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {review.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No reviews found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default StatReviews;
