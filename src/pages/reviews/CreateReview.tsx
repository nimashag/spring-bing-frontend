//this needs to be redo as not logged in from a user

import React, { useState } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { PiCheckCircleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const CreateReview: React.FC = () => {
  const navigate = useNavigate(); 
  const [user_id, setUserId] = useState<string>('');
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<number>(5); // Default - 5
  const [imagesPath, setImagesPath] = useState<string[]>([]);
  const [status] = useState<string>("Pending"); // Default - Pending
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [backendErrorMessage, setBackendErrorMessage] = useState<string | null>(null);

  const handleReviewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const review = {
      title,
      description,
      rating,
      images_path: imagesPath, 
      status,
      user: {
        fname: "Change Type", // change this - after creating users
      },
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setBackendErrorMessage(null); 
        setTitle(""); 
        setDescription(""); 
        setRating(5); 
        setImagesPath([]); 
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        const errorData = await response.json();
        setBackendErrorMessage(errorData.message); 
      }
    } catch (error) {
      setBackendErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const handleCancel = () => {
    navigate('/reviews'); 
  };

  return (
    <div className="px-4 my-12">
      <form onSubmit={handleReviewSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Write a Review
        </h2>
        <div className="mb-4">
          <Label htmlFor="title" value="Title" />
          <TextInput
            id="title"
            name="title"
            type="text"
            placeholder="Enter review title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description" value="Description" />
          <Textarea
            id="description"
            name="description"
            placeholder="Enter your review description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="rating" value="Rating" />
          <Select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="images" value="Images (optional)" />
          <Textarea
            id="images"
            name="images"
            rows={5}
            placeholder="Enter images (comma-separated)"
            value={imagesPath.join(", ")}
            onChange={(e) => setImagesPath(e.target.value.split(", ").map(path => path.trim()))}
          />
        </div>
        <div className="flex justify-between mt-6">
          <Button className='bg-red-500 text-white font-semibold px-5 py-2 rounded hover:bg-red-700 transition-all duration-300' type="button" onClick={handleCancel}>Cancel</Button>
          <Button className='bg-green-500 text-white font-semibold px-5 py-2 rounded hover:bg-green-800 transition-all duration-300' type="submit">Submit</Button>
        </div>

        {showSuccessMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg flex items-center">
            <PiCheckCircleBold className="h-6 w-6 mr-2" />
            <span className="text-lg">Review Submitted Successfully!</span>
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

export default CreateReview;
