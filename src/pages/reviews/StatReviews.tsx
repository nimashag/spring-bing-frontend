import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import '../../dashboard/DashboardLayout.css';
import SidebarComp from '../../dashboard/SidebarComp';
import logoImgPath from '../../assets/finallogo.png'

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


  // PDF Generation for all reviews ---------------------------------------------------------------------------------------------------------------------
  const handleDownloadAllReviewsPDF = () => {
    const pdf = new jsPDF();
    const currentDate = new Date().toISOString().slice(0, 10);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const title = ``;

     //header
     const logoWidth = 20;
     const logoHeight = 20; 
     pdf.addImage(logoImgPath, 'PNG', 5, 5, logoWidth, logoHeight); 

     // Set font for the title
     pdf.setFontSize(22);
     pdf.setFont('helvetica', 'bold');
     pdf.setTextColor(33, 37, 41); 
     pdf.text('All Reviews Report', 60, 15); 

     // Report type and date
     pdf.setFontSize(10);
     pdf.setTextColor(100); 
     pdf.text('Report Category: User Reviews', 150, 10);
     pdf.text('Contact: +94 75 123 546', 165, 16); 
     pdf.text(`Date: ${new Date().toLocaleDateString()}`, 177, 22); 

     // Draw a line under the header
     pdf.setDrawColor(100);
     pdf.line(10, 25, 200, 25);
    
    // Center the title and date in PDF
    pdf.setFontSize(18);
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, 20);

    const tableColumn = [
      "Title",
      "Rating",
      "Date",
      "Status",
    ];

    const tableRows = [];

    // Add all reviews data into tableRows
    reviews.forEach((review) => {
      const reviewData = [
        review.title,
        review.rating.toString(),
        new Date(review.date).toLocaleDateString(),
        review.status,
      ];
      tableRows.push(reviewData);
    });

    // Automatically generate table with headers and rows
    pdf.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40, 
      theme: 'grid', 
      styles: {
        fontSize: 10, 
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [30, 58, 138], 
        textColor: [255, 255, 255], 
      },
    });

    pdf.save(`all_reviews_${currentDate}.pdf`);
  };

  // PDF Generation For Shown Content --------------------------------------------------------------------------------------------------------------------------------------------
  const generatePDF = () => {
    const buttonsToHide = document.getElementsByClassName('hide-on-pdf');
    for (let i = 0; i < buttonsToHide.length; i++) {
      (buttonsToHide[i] as HTMLElement).style.display = 'none';
    }

    const content = document.getElementById('main-content'); 

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      //header
      const logoWidth = 25;
      const logoHeight = 25; 
      pdf.addImage(logoImgPath, 'PNG', 0, 0, logoWidth, logoHeight); 

      // Set font for the title
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(33, 37, 41); 
      pdf.text('Reviews Report', 60, 15); 

      // Report type and date
      pdf.setFontSize(10);
      pdf.setTextColor(100); 
      pdf.text('Report Category: User Reviews', 150, 10);
      pdf.text('Contact: +94 75 123 546', 165, 16); 
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 177, 22); 

      // Draw a line under the header
      pdf.setDrawColor(100);
      pdf.line(10, 25, 200, 25); 

      const imgHeight = (canvas.height * 210) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 35, 210, imgHeight);

      // Add table borders in the PDF
      const pageHeight = pdf.internal.pageSize.height; 

      pdf.save('review_statistics.pdf');

      for (let i = 0; i < buttonsToHide.length; i++) {
        (buttonsToHide[i] as HTMLElement).style.display = 'inline-block';
      }
    });
  };

  return (
    <div className="px-4 my-6">
      {/* Sidebar */}
      <SidebarComp />
       
      <div className='main-content' id='main-content'>
        {/* Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-4 mt-6">
            <h2 className="text-3xl font-bold">Review Statistics</h2>

            <div className="flex items-center gap-4">
              {/* Status Filter */}
              <div className="">
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
              <div className="">
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
              <div className="relative w-64 flex items-center gap-4">
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

        {/* PDF generation */}
        <div className="flex justify-end">
          <button
            onClick={generatePDF}
            className="hide-on-pdf bg-sky-600 hover:bg-sky-700 text-white px-8 py-2 rounded-full shadow-md"
          >
            Download Content
          </button>
          <button
            onClick={handleDownloadAllReviewsPDF}
            className="hide-on-pdf ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md"
          >
            Download All Reviews
          </button>
        </div>

        {/* Reviews Table */}
        <div className="mt-4 flex justify-center items-center">
          <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold border border-gray-300">Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold border border-gray-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold border border-gray-300">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold border border-gray-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentReviews.length > 0 ? (
                currentReviews.map((review, index) => (
                  <tr key={review._id} className="border-b border-gray-200">
                    <td className="px-6 py-4 border border-gray-300">{index + indexOfFirstReview + 1}</td>
                    <td className="px-6 py-4 border border-gray-300">{review.title}</td>
                    <td className="px-6 py-4 border border-gray-300">{review.rating}</td>
                    <td className="px-6 py-4 border border-gray-300">{new Date(review.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 border border-gray-300">{review.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center border border-gray-300">No reviews found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center">
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <div className='flex gap-4'>
            <button
              className={`hide-on-pdf px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-sky-600 text-white'}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`hide-on-pdf px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-sky-600 text-white'}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
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
