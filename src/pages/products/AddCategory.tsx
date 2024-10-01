import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { PiCheckCircleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

import '../../dashboard/DashboardLayout.css'

const AddCategory: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleCategorySubmit = async (event) => {
        event.preventDefault();
        const category = { name, description };

        try {
            const response = await fetch("http://localhost:3000/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
            });

            if (response.ok) {
                setShowSuccessMessage(true);
                setName(""); // Clear the input fields after successful submission
                setDescription("");
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error("Failed to create category");
            }
        } catch (error) {
            console.error("Failed to create category:", error);
        }
    };

    return (
        <div className="flex h-screen ">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Admin Dashboard</h2>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/admin/dash">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/manage-products">Manage Products</Link>
            </li>
            <li>
              <Link to="/admin/stat-products">Stock Summary</Link>
            </li>
            <li>
              <Link to="">Orders</Link>
            </li>
            <li>
              <Link to="/admin/manage-reviews">Manage Reviews</Link>
            </li>
            <li>
              <Link to="/admin/manage-faq">Manage FAQs</Link>
            </li>
            <li>
              <Link to="">Finance Report</Link>
            </li>
            <li>
              <Link to="">Profile</Link>
            </li>
            <li>
              <Link to="">Logout</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ">
        <div className="px-4 my-12">
            <form
                onSubmit={handleCategorySubmit}
                className="flex flex-col gap-6 p-8 bg-white shadow-md rounded-lg max-w-3xl mx-auto"
            >
                <h2 className="text-4xl font-semibold text-gray-800 mb-4">
                    Add Category
                </h2>

                {/* Category Name */}
                <div className="w-full">
                    <Label
                        htmlFor="category_name"
                        value="Category Name"
                        className="text-gray-700 font-medium text-l mb-2"
                    />
                    <TextInput
                        id="category_name"
                        name="category_name"
                        type="text"
                        placeholder="Enter category name"
                        className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Category Description */}
                <div className="w-full">
                    <Label
                        htmlFor="description"
                        value="Description"
                        className="text-gray-700 font-medium text-l mb-2"
                    />
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter category description"
                        className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md mt-4"
                >
                    Create Category
                </Button>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        <PiCheckCircleBold className="inline-block mr-2" />
                        Category created successfully!
                    </div>
                )}
            </form>
        </div>
        </main>
        </div>
    );
};

export default AddCategory;
