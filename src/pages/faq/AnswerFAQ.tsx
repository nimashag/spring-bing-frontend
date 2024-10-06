import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import { PiCheckCircleBold } from "react-icons/pi";

const AnswerFAQ: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [faq, setFaq] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [answeredBy, setAnsweredBy] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the FAQ details to populate the form
    fetch(`http://localhost:3000/faqs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFaq(data.data);
        setStatus(data.data.status);
        setAnsweredBy(data.data.answered_by || ''); // Initialize answered_by
      })
      .catch((error) => console.error('Error fetching FAQ:', error));
  }, [id]);

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
  
    const updatedFAQ = {
      full_name: faq.full_name, // Use the current state value
      question: faq.question, // Use the current state value
      answer: faq.answer, // Use the current state value
      status: status,
      answered_by: answeredBy,
      category: faq.category // Include the category in the update
    };
  
    fetch(`http://localhost:3000/faqs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedFAQ)
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Failed to update FAQ: ${text}`);
          });
        }
        return res.json();
      })
      .then(() => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/admin/manage-faq');  // Redirect after update
        }, 5000);
      })
      .catch((error) => {
        console.error('Error updating FAQ:', error);
        alert(error.message); // Display a more detailed error message
      });
  }

  const handleCancel = () => {
    navigate('/admin/manage-faq'); // Redirect to manage-faq on cancel
  };

  if (!faq) return <div>Loading...</div>;

  return (
    <div className="px-4 my-12">
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-6 p-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Answer/Update FAQ
        </h2>

        {/* Full Name */}
        <div className="w-full">
          <Label
            htmlFor="full_name"
            value="Full Name"
            className="text-gray-700 font-medium mb-2"
          />
          <TextInput
            id="full_name"
            name="full_name"
            type="text"
            value={faq.full_name}
            onChange={(e) => setFaq({ ...faq, full_name: e.target.value })}
            placeholder="Enter full name"
            className="mt-1 block w-fullborder-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Question */}
        <div className="w-full">
          <Label
            htmlFor="question"
            value="Question"
            className="text-gray-700 font-medium mb-2"
          />
          <Textarea
            id="question"
            name="question"
            rows={4}
            value={faq.question}
            onChange={(e) => setFaq({ ...faq, question: e.target.value })}
            placeholder="Enter the question"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Category */}
        <div className="w-full">
          <Label
            htmlFor="category"
            value="Category"
            className="text-gray-700 font-medium mb-2"
          />
          <TextInput
            id="category"
            name="category"
            type="text"
            value={faq.category}
            onChange={(e) => setFaq({ ...faq, category: e.target.value })}
            placeholder="Enter category"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Answer */}
        <div className="w-full">
          <Label
            htmlFor="answer"
            value="Answer"
            className="text-gray-700 font-medium mb-2"
          />
          <Textarea
            id="answer"
            name="answer"
            rows={6}
            value={faq.answer || ''}
            onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
            placeholder="Enter the answer"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Status */}
        <div className="w-full">
          <Label
            htmlFor="status"
            value="Status"
            className="text-gray-700 font-medium mb-2"
          />
          <Select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 "
            required
          >
            <option value="Pending">Pending</option>
            <option value="Solved">Solved</option>
          </Select>
        </div>

        {/* Answered By */}
        <div className="w-full">
          <Label
            htmlFor="answered_by"
            value="Answered By"
            className="text-gray-700 font-medium mb-2"
          />
          <TextInput
            id="answered_by"
            name="answered_by"
            type="text"
            value={answeredBy}
            onChange={(e) => setAnsweredBy(e.target.value)}
            placeholder="Enter your name"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <Button
            type="button"
            onClick={handleCancel}
            className="w-full lg:w-48 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full lg:w-48 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update
          </Button>
        </div>
      </form>

      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg flex items-center">
          <PiCheckCircleBold className="h-6 w-6 mr-2" />
          <span className="text-lg">FAQ Updated Successfully!</span>
        </div>
      )}
    </div>
  );
};

export default AnswerFAQ;
