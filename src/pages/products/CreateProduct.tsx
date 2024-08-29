import React, { useState, useEffect } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { PiCheckCircleBold } from "react-icons/pi";
import Category from "../../interfaces/Category.tsx";
import SubCategory from "../../interfaces/SubCategory.tsx";

const CreateProduct: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Fetch categories
    fetch("http://localhost:3000/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
        setSelectedCategory(data.data[0]._id); // Select first category by default
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch subcategories
    fetch("http://localhost:3000/subcategory")
      .then((response) => response.json())
      .then((data) => {
        setSubCategories(data.data);
        setSelectedSubCategory(data.data[0]._id); // Select first subcategory by default
      })
      .catch((error) => console.error("Error fetching subcategories:", error));
  }, []);

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const product = {
      name: form.product_name.value,
      unit_price: parseFloat(form.unit_price.value),
      metadata: [
        {
          color: form.color.value,
          size: form.size.value,
          quantity: parseInt(form.quantity.value, 10),
        },
      ],
      description: form.description.value,
      category: [selectedCategory],
      sub_category: [selectedSubCategory],
      images_path: form.images_path.value.split(",").map((path) => path.trim()),
    };

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        form.reset();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="px-4 my-12">
      <form
        onSubmit={handleProductSubmit}
        className="flex flex-col gap-6 p-8 bg-white shadow-md rounded-lg max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Product
        </h2>

        {/* Product Name and Unit Price */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <Label
              htmlFor="product_name"
              value="Product Name"
              className="text-gray-700 font-medium mb-2"
            />
            <TextInput
              id="product_name"
              name="product_name"
              type="text"
              placeholder="  Enter product name"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="unit_price"
              value="Unit Price"
              className="text-gray-700 font-medium mb-2"
            />
            <TextInput
              id="unit_price"
              name="unit_price"
              type="number"
              placeholder="  Enter unit price"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        {/* Color and Size */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <Label
              htmlFor="color"
              value="Color"
              className="text-gray-700 font-medium mb-2"
            />
            <TextInput
              id="color"
              name="color"
              type="text"
              placeholder="  Enter color"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="size"
              value="Size"
              className="text-gray-700 font-medium mb-2"
            />
            <TextInput
              id="size"
              name="size"
              type="text"
              placeholder="  Enter size"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="w-full">
          <Label
            htmlFor="quantity"
            value="Quantity"
            className="text-gray-700 font-medium mb-2"
          />
          <TextInput
            id="quantity"
            name="quantity"
            type="number"
            placeholder="  Enter quantity"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Category and Sub Category */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <Label
              htmlFor="category"
              value="Category"
              className="text-gray-700 font-medium mb-2"
            />
            <Select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              {categories.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="w-full">
            <Label
              htmlFor="sub_category"
              value="Sub Category"
              className="text-gray-700 font-medium mb-2"
            />
            <Select
              id="sub_category"
              name="sub_category"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              {subCategories.map((subcategory: SubCategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Images Path */}
        <div className="w-full">
          <Label
            htmlFor="images_path"
            value="Images Path (comma separated)"
            className="text-gray-700 font-medium mb-2"
          />
          <TextInput
            id="images_path"
            name="images_path"
            type="text"
            placeholder="  e.g., path/to/image1.jpg, path/to/image2.jpg"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Description */}
        <div className="w-full">
          <Label
            htmlFor="description"
            value="Product Description"
            className="text-gray-700 font-medium mb-2"
          />
          <Textarea
            id="description"
            name="description"
            placeholder="  Write your product description"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            rows={6}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            className="w-full lg:w-48 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Product
          </Button>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center">
            <PiCheckCircleBold className="h-6 w-6 mr-2" />
            <span className="text-lg">Product Created Successfully!</span>
          </div>
        )}
      </form>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg flex items-center">
          <PiCheckCircleBold className="h-6 w-6 mr-2" />
          <span className="text-lg">Product Created Successfully!</span>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
