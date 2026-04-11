import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


import '../../dashboard/DashboardLayout.css';

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

import SidebarComp from '../../dashboard/SidebarComp';

interface Review {
  _id: string;
  title: string;
  description: string;
  rating: number;
  date: string;
  status: string;
  images_path?: string[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SummaryReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | ''>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showStats, setShowStats] = useState(false);

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

  const filteredReviews = reviews.filter(review =>
    (statusFilter === '' || review.status === statusFilter) &&
    (ratingFilter === '' || review.rating === ratingFilter) &&
    (selectedDate === null ||
      new Date(review.date).getMonth() === selectedDate.getMonth() &&
      new Date(review.date).getFullYear() === selectedDate.getFullYear())
  );

  const resetCalendarFilter = () => {
    setSelectedDate(null);
  };

  const totalReviews = filteredReviews.length;
  const totalRatings = filteredReviews.reduce((acc, review) => acc + review.rating, 0);
  const avgRating = totalReviews > 0 ? (totalRatings / totalReviews).toFixed(2) : 'N/A';
  const pendingReviews = filteredReviews.filter(review => review.status === 'pending').length;
  const solvedReviews = filteredReviews.filter(review => review.status === 'solved').length;
  const onProgressReviews = filteredReviews.filter(review => review.status === 'onprogress').length;

  const positiveReviews = filteredReviews.filter(review => review.rating >= 4).length;
  const neutralReviews = filteredReviews.filter(review => review.rating === 3).length;
  const badReviews = filteredReviews.filter(review => review.rating <= 2).length;

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
        text: 'Review Trends',
      },
    },
  };

  return (
    <div className="px-4 my-6">
        {/* Sidebar */}
      <SidebarComp />

        <div className='main-content'>
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between mb-4 mt-6">
                <h2 className="text-3xl font-bold">Review Summary</h2>
                <div className="flex items-center gap-4">
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

                    <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
                        placeholderText="Select Month/Year"
                    />
                    <div>
                        <FaCalendarAlt size="20px" />
                    </div>
                    {selectedDate && (
                        <button onClick={resetCalendarFilter} className="text-gray-500">
                        <FaTimes size="20px" />
                        </button>
                    )}
                    
                </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
                <h3 className="text-2xl font-semibold mb-4">Monthly Summary</h3>

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

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-white shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold">Positive Reviews</h4>
                    <p className="text-xl">{positiveReviews}</p>
                    </div>
                    <div className="p-4 bg-white shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold">Neutral Reviews</h4>
                    <p className="text-xl">{neutralReviews}</p>
                    </div>
                    <div className="p-4 bg-white shadow-sm rounded-lg">
                    <h4 className="text-lg font-semibold">Bad Reviews</h4>
                    <p className="text-xl">{badReviews}</p>
                    </div>
                </div>
                </div>

                <h2 className="text-2xl font-semibold text-center">Review Graph Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">  
                {[{
                    data: positiveReviewsByMonth,
                    label: 'Positive Reviews',
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    data: neutralReviewsByMonth,
                    label: 'Neutral Reviews',
                    borderColor: 'rgb(255, 206, 86)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    data: badReviewsByMonth,
                    label: 'Bad Reviews',
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                }].map((chart, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                    <Line
                        data={lineChartData(chart.data, chart.label, chart.borderColor, chart.backgroundColor)}
                        options={lineChartOptions}
                    />
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default SummaryReviews;
