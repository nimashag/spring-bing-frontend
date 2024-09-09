import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

interface FAQ {
  _id: string;
  full_name: string;
  question: string;
  category: string;
  status: string;
  answer?: string;
  answered_by?: string;
}

const ManageFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/faqs")
      .then((res) => res.json())
      .then((data) => setFaqs(data.data))
      .catch((error) => {
        console.error('Error fetching FAQs:', error);
      });
  }, []);

  // Handling the deletion process of questions
  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/faqs/${_id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        // Check if the response is an HTML error page
        const textResponse = await response.text();
        if (textResponse.startsWith('<!DOCTYPE html>')) {
          console.error("Received an HTML error page instead of JSON.");
          console.error(textResponse);  // Log the HTML for further inspection
          return;
        }
        // Otherwise, try to parse as JSON
        throw new Error(`Failed to delete FAQ, status: ${response.status}`);
      }
  
      // Assuming the response is JSON
      const data = await response.json();
      console.log("Delete response:", data);
  
      if (data.message === "FAQ Deleted") {
        setFaqs(prevFaqs => prevFaqs.filter(faq => faq._id !== _id));
      } else {
        console.error("Unexpected delete response:", data);
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq =>
    faq.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 my-6"> {/* Reduced margin here */}
      <div className="flex flex-col gap-4"> {/* Added gap control here */}
        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-bold">Manage Your FAQs</h2>

          {/* Search bar */}
          <div className="relative w-96 mb-4">
            <input
              type="text"
              placeholder="Search FAQs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
            />
            <div className="absolute top-0 left-0 mt-2.5 ml-4 text-gray-500">
              <FaSearch size="20px" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex justify-center items-center min-h-screen">
          <table className="w-full lg:w-[1180px] table-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Question
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredFaqs.map((faq, index) => (
                <tr key={faq._id} className="bg-white hover:bg-gray-100 transition duration-300">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {faq.full_name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {faq.question}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {faq.category}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {faq.status}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <Link to={`/answer-faq/${faq._id}`}>
                      <button className="text-cyan-600 font-medium hover:underline">
                        Answer
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded transition duration-300"
                      onClick={() => handleDelete(faq._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageFAQ;
