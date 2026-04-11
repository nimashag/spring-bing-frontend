import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import '../../dashboard/DashboardLayout.css';
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

const ManageReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMessage, setDeleteMessage] = useState(''); // Message state for deleted review
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
        console.log("Fetched reviews data:", data);
        setReviews(data || []);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/reviews/${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const textResponse = await response.text();
        if (textResponse.startsWith('<!DOCTYPE html>')) {
          console.error("Received an HTML error page instead of JSON.");
          console.error(textResponse);
          return;
        }
        throw new Error(`Failed to delete review, status: ${response.status}`);
      }

      const data = await response.json();
      if (data.message === "Review Deleted") {
        setReviews(prevReviews => prevReviews.filter(review => review._id !== _id));
        setDeleteMessage("Review deleted successfully!"); // Set delete message

        // Remove message after 3 seconds
        setTimeout(() => {
          setDeleteMessage('');
        }, 3000);
      } else {
        console.error("Unexpected delete response:", data);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Filter and paginate reviews
  const filteredReviews = reviews.filter(review =>
    (review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === '' || review.status === statusFilter)
  );

  // Calculate pagination variables
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle previous and next page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <SidebarComp />

      {/* Main Content */}
      <main className="main-content">
        <div className="px-4 my-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">Manage Your Reviews</h2>

              <div className="flex items-center gap-4">
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

                <div className="relative w-96 mb-4">
                  <input
                    type="text"
                    placeholder="Search Reviews"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
                  />
                  <div className="absolute top-0 left-0 mt-2.5 ml-4 text-gray-500">
                    <FaSearch size="20px" />
                  </div>
                </div>
              </div>
            </div>

            {/* Display delete message */}
            {deleteMessage && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
                {deleteMessage}
              </div>
            )}

            <div className="flex justify-center items-center">
              <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-sky-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Title</th> {/* Removed User Name */}
                    <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {currentReviews.length > 0 ? (
                    currentReviews.map((review, index) => (
                      <tr key={review._id} className="bg-white hover:bg-gray-100 transition duration-300">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {indexOfFirstReview + index + 1}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {review.title}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {review.rating}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {review.status}
                        </td>
                        <td className="px-6 py-4 flex gap-4">
                          <Link to={`/admin/edit-review/${review._id}`}>
                            <button
                              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-1 rounded transition duration-300"
                            >
                              <AiOutlineEdit />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded transition duration-300"
                            onClick={() => handleDelete(review._id)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center"> {/* Adjusted colSpan to 5 */}
                        No reviews found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
              <div className="">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-sky-700 text-white'}`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-sky-700 text-white'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageReviews;
