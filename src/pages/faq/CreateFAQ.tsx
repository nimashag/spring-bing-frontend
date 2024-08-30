import React, { useState } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { PiCheckCircleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const CreateFAQ: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [categories, setCategories] = useState<string[]>([
    'Clothing', 'System', 'Payment', 'Account', 'Returns & Exchanges',
    'Orders', 'Promotions & Discounts', 'Product Care', 'General Information'
  ]);

  const [status, setStatus] = useState<string[]>([
    'Pending', 'Solved'
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [selectedStatus, setSelectedStatus] = useState<string>(status[0]);
  const [fullName, setFullName] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [backendErrorMessage, setBackendErrorMessage] = useState<string | null>(null);

  const validateFullName = (name: string) => {
    const regex = /^[A-Za-z\s]+$/; // Only letters and spaces are allowed
    if (!regex.test(name)) {
      setFullNameError("Numbers or special characters are not allowed in the name.");
    } else {
      setFullNameError(null);
    }
  };

  const handleFAQSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    validateFullName(fullName);
    
    if (fullNameError || questionError) {
      return; // Prevent form submission if there's an error
    }

    const faq = {
      full_name: fullName,
      question: question,
      category: selectedCategory,
      status: selectedStatus,
    };

    try {
      const response = await fetch("http://localhost:3000/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faq),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setBackendErrorMessage(null); // Clear any backend error messages
        setFullName(""); // Clear the name field
        setQuestion(""); // Clear the question field
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        const errorData = await response.json();
        setBackendErrorMessage(errorData.message); // Show backend error message
      }
    } catch (error) {
      setBackendErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const handleCancel = () => {
    navigate('/faqs'); // Redirect to /faqs
  };

  return (
    <div className="px-4 my-12">
      <form onSubmit={handleFAQSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ask Your Question
        </h2>
        <div className="mb-4">
          <Label htmlFor="full_name" value="Full Name" />
          <TextInput
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              validateFullName(e.target.value);
            }}
            required
          />
          {fullNameError && <p className="text-red-600 text-sm mt-1">{fullNameError}</p>}
        </div>
        <div className="mb-4">
          <Label htmlFor="question" value="Question" />
          <Textarea
            id="question"
            name="question"
            placeholder="Enter your question"
            rows={6}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            required
          />
          {questionError && <p className="text-red-600 text-sm mt-1">{questionError}</p>}
        </div>
        <div className="mb-4">
          <Label htmlFor="category" value="Category" />
          <Select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex justify-between mt-6">
          <Button className='bg-red-500 text-white font-semibold px-5 py-2 rounded hover:bg-red-700 transition-all duration-300' type="button" onClick={handleCancel}>Cancel</Button>
          <Button className='bg-green-500 text-white font-semibold px-5 py-2 rounded hover:bg-green-800 transition-all duration-300' type="submit">Submit</Button>
        </div>

        {showSuccessMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg flex items-center">
            <PiCheckCircleBold className="h-6 w-6 mr-2" />
            <span className="text-lg">Question Submitted Successfully!</span>
          </div>
        )}
        {backendErrorMessage && (
          <div className="mt-4 text-red-600">
            {backendErrorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateFAQ;
