import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { PiCheckCircleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

import '../../dashboard/DashboardLayout.css'
import SidebarComp from "../../dashboard/SidebarComp.tsx";

const AddSubCategory: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubCategorySubmit = async (event) => {
        event.preventDefault();
        const subCategory = { name, description };

        try {
            const response = await fetch("http://localhost:3000/subCategory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subCategory),
            });

            if (response.ok) {
                setShowSuccessMessage(true);
                setName(""); // Clear the input fields after successful submission
                setDescription("");
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error("Failed to create subcategory");
            }
        } catch (error) {
            console.error("Failed to create subcategory:", error);
        }
    };

    return (
        <div className="flex h-screen ">
      {/* Sidebar */}
      <SidebarComp />


      {/* Main Content */}
      <main className="main-content ">
        <div className="px-4 my-12">
            <form
                onSubmit={handleSubCategorySubmit}
                className="flex flex-col gap-6 p-8 bg-white shadow-md rounded-lg max-w-3xl mx-auto"
            >
                <h2 className="text-4xl font-semibold text-gray-800 mb-4">
                    Add Subcategory
                </h2>

                {/* Subcategory Name */}
                <div className="w-full">
                    <Label
                        htmlFor="subcategory_name"
                        value="Subcategory Name"
                        className="text-gray-700 font-medium text-xl mb-2"
                    />
                    <TextInput
                        id="subcategory_name"
                        name="subcategory_name"
                        type="text"
                        placeholder="Enter subcategory name"
                        className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Subcategory Description */}
                <div className="w-full">
                    <Label
                        htmlFor="description"
                        value="Description"
                        className="text-gray-700 font-medium text-xl mb-2"
                    />
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter subcategory description"
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
                    Create Subcategory
                </Button>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        <PiCheckCircleBold className="inline-block mr-2" />
                        Subcategory created successfully!
                    </div>
                )}
            </form>
        </div>
        </main>
        </div>
    );
};

export default AddSubCategory;
