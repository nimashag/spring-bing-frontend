import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import { PiCheckCircleBold } from "react-icons/pi";

const EditReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<number | string>("");
  const [status, setStatus] = useState<string>("");
  const [imagesPath, setImagesPath] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the review details to populate the form
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
        setTitle(data.title);
        setDescription(data.description);
        setRating(data.rating);
        setStatus(data.status);
        setImagesPath(data.images_path || []);
      })
      .catch((error) => console.error("Error fetching review:", error));
  }, [id]);

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedReview = {
      title: title,
      description: description,
      rating: rating,
      status: status,
      images_path: imagesPath,
    };

    fetch(`http://localhost:3000/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Failed to update review: ${text}`);
          });
        }
        return res.json();
      })
      .then(() => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate("/admin/manage-reviews"); // Redirect after update
        }, 5000);
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        alert(error.message); // Display a more detailed error message
      });
  };

  const handleCancel = () => {
    navigate("/admin/manage-reviews"); // Redirect to manage-reviews on cancel
  };

  if (!review) return <div>Loading...</div>;

  return (
    <div className="px-4 my-12">
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-8 p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Review</h2>

        {/* Title */}
        <div className="w-full">
          <Label
            htmlFor="title"
            value="Title"
            className="text-gray-700 font-medium mb-2"
          />
          <TextInput
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
            required
          />
        </div>

        {/* Description */}
        <div className="w-full">
          <Label
            htmlFor="description"
            value="Description"
            className="text-gray-700 font-medium mb-2"
          />
          <Textarea
            id="description"
            name="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
            required
          />
        </div>

        {/* Rating */}
        <div className="w-full">
          <Label
            htmlFor="rating"
            value="Rating"
            className="text-gray-700 font-medium mb-2"
          />
          <Select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
            required
          >
            <option value="">Select rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
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
            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
            required
          >
            <option value="pending">Pending</option>
            <option value="solved">Solved</option>
            <option value="onprogress">On Progress</option>
          </Select>
        </div>

        {/* Images Path */}
        <div className="w-full">
          <Label
            htmlFor="images_path"
            value="Images Path (Comma-separated)"
            className="text-gray-700 font-medium mb-2"
          />
          <Textarea
            id="images_path"
            name="images_path"
            rows={6}
            value={imagesPath.join(", ")}
            onChange={(e) =>
              setImagesPath(e.target.value.split(",").map((img) => img.trim()))
            }
            placeholder="Enter image URLs, comma-separated"
            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <Button
            type="button"
            onClick={handleCancel}
            className="w-full lg:w-48 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full lg:w-48 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update
          </Button>
        </div>
      </form>

      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-5 rounded-lg flex items-center shadow-lg">
          <PiCheckCircleBold className="h-6 w-6 mr-2" />
          <span className="text-lg">Review Updated Successfully!</span>
        </div>
      )}
    </div>
  );
};

export default EditReview;
