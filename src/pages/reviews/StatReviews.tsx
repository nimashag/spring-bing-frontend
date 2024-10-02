import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';

import { AiFillHome, AiOutlineUser, AiOutlineRise, AiOutlineFileDone, AiOutlineTeam, AiOutlineUserSwitch, AiTwotoneFund, AiTwotoneHeart, AiOutlineForm, AiOutlineQuestion, AiOutlineShopping } from 'react-icons/ai';
import { MdProductionQuantityLimits } from 'react-icons/md';
import '../../dashboard/DashboardLayout.css';
import { Link } from 'react-router-dom';
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

const StatReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | ''>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const reviewsPerPage = 10; 

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

  // Filter by rating, status, and date
  const filteredReviews = reviews
    .filter(review => 
      (statusFilter === '' || review.status === statusFilter) &&
      (ratingFilter === '' || review.rating === ratingFilter) &&
      (selectedDate === null || 
        new Date(review.date).getMonth() === selectedDate.getMonth() && 
        new Date(review.date).getFullYear() === selectedDate.getFullYear())
    );

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Function to reset the calendar filter
  const resetCalendarFilter = () => {
    setSelectedDate(null); 
  };

  return (
    <div className="px-4 my-6">
      {/* Sidebar */}
      <SidebarComp />
       
      <div className='main-content'>
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


        {/* Reviews Table */}
        <div className="flex justify-center items-center">
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
              {currentReviews.length > 0 ? (
                currentReviews.map((review, index) => (
                  <tr key={review._id} className="bg-white hover:bg-gray-100 transition duration-300">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {indexOfFirstReview + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{review.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(review.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{review.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          <span className="mx-auto">{`Page ${currentPage} of ${totalPages}`}</span>
          
          <div className="flex">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatReviews;
