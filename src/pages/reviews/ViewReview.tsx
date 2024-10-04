import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaSearch, FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons
import { Link } from 'react-router-dom';
import reviewpic from '../../assets/reviewpic.jpg';
import NewsLetter from '../../components/NewsLetter';
import Title from '../../components/Title';

interface Review {
    _id: string;
    title: string;
    description: string;
    rating: number;
    date: string;
    user: {
        fname: string;
    };
    images_path?: string[];
}

const ViewReview: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [reviews, setReviews] = useState<Review[]>([]);
    const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
    const [filterOption, setFilterOption] = useState<number | null>(null); // Change to a number representing the star filter
    const [dateSortOption, setDateSortOption] = useState<string>("none");
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const reviewsPerPage = 9; 

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:3000/reviews'); 
                const data = await response.json();
                setReviews(data);
                setFilteredReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        let results = reviews.filter(review =>
            review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filterOption) {
            results = results.filter(review => review.rating === filterOption);
        }

        if (dateSortOption === "latest") {
            results = results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Latest first
        } else if (dateSortOption === "oldest") {
            results = results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Oldest first
        }

        setFilteredReviews(results);
    }, [searchQuery, reviews, filterOption, dateSortOption]);

    // Calculate the current reviews to display
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
    
    // Calculate total pages
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Handle previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to render stars based on the rating
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />); // Filled star
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500" />); // Empty star
            }
        }
        return stars;
    };

    return (
        <div className='mt-18 px-4 lg:px-24 pt-10'>
            <div className='flex justify-between items-start mb-8'>
                <h2 className='text-4xl font-bold'>What People Think About Us!</h2>
            </div>

            <div className='w-full mt-16 py-12 bg-white px-4 lg:px-24 relative'>
                {/* Background Image */}
                <div className='absolute inset-0'>
                    <img src={reviewpic} alt="background" className='w-full h-full object-cover' />
                </div>

                {/* Overlay */}
                <div className='relative z-10 bg-black bg-opacity-50 p-8 md:p-12 lg:p-16 text-white'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
                        <div>
                            <h2 className='text-4xl font-bold mb-6 leading-snug'>
                                Have Feedback on Your Recent Purchase? <br /> Let Us Know!
                            </h2>
                            <p className='md:w-1/2'>
                                We value your opinion and strive to provide the best shopping experience possible. Whether you’re thrilled with your new 
                                item or have suggestions for improvement, we’d love to hear your thoughts. Your feedback helps us grow and improve, ensuring 
                                we always deliver what you love. Share your review and help others in the Spring Bing community make informed choices. Thank you 
                                for being a part of our journey!
                            </p>
                            <Link to="/create-review" className='mt-5 block'>
                                <button className='bg-black text-white font-semibold px-5 py-2 rounded hover:bg-white hover:text-black transition-all duration-300'>
                                    Add Review
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <div className='flex justify-between items-start mb-8'>
                    <h2 className='text-4xl font-bold'>Customer Reviews</h2>
                        <div className='flex items-center gap-3'>
                            <div>
                                <select
                                    value={filterOption ?? "none"}
                                    onChange={(e) => setFilterOption(e.target.value === "none" ? null : parseInt(e.target.value))}
                                    className="h-10 pl-4 pr-8 border border-gray-300 rounded-full"
                                >
                                    <option value="none">Filter by Rating</option>
                                    <option value="5">5 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="2">2 Stars</option>
                                    <option value="1">1 Star</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    value={dateSortOption}
                                    onChange={(e) => setDateSortOption(e.target.value)}
                                    className="h-10 pl-4 pr-8 border border-gray-300 rounded-full"
                                >
                                    <option value="none">Sort by Date</option>
                                    <option value="latest">Latest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>

                            <div className="relative w-96">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className='h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300'
                                />
                                <div className="absolute top-0 left-0 mt-2.5 ml-4 text-gray-500">
                                    <FaSearch size="20px" />
                                </div>
                            </div>
                        </div>
                    </div>
                <br/>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {currentReviews.length > 0 ? (
                        currentReviews.map((review) => (
                            <Card key={review._id}>
                                <h4 className="text-xl font-bold">{review.title}</h4>
                                <p className="text-gray-500">{review.description}</p>
                                
                                {/* Display Stars for Rating */}
                                <div className="flex items-center mt-2">
                                    {renderStars(review.rating)}
                                </div>

                                <p className="text-gray-400 text-sm">Posted by {review.user?.fname} on {new Date(review.date).toLocaleDateString()}</p>
                                
                                {review.images_path && review.images_path.length > 0 && (
                                    <div className="mt-4">
                                        <div className="grid grid-cols-2 gap-2">
                                            {review.images_path.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image} 
                                                    alt={`review image ${index + 1}`}
                                                    className="h-60 w-full object-cover rounded" 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))
                    ) : (
                        <p>No reviews found</p>
                    )}
                </div>
                
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-6">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                    >
                        Previous
                    </button>
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 px-4 py-2 rounded-md ml-2"
                    >
                        Next
                    </button>
                </div>
            </div>
            <br/>
            <NewsLetter />
        </div>
    );
};

export default ViewReview;
