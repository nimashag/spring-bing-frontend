import React, { useState, useEffect } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { PiCheckCircleBold } from "react-icons/pi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // Import icons for + and - buttons
import Category from "../../interfaces/Category.tsx";
import SubCategory from "../../interfaces/SubCategory.tsx";
import { Link } from "react-router-dom";

import '../../dashboard/DashboardLayout.css'
import SidebarComp from "../../dashboard/SidebarComp.tsx";

const CreateProduct: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const [metadata, setMetadata] = useState([{ color: "", size: "", quantity: 0 }]); // Initialize with one set
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    unitPrice: "",
    metadata: [{ color: "", size: "", quantity: "" }],
    imagesPath: "",
  });

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

  const handleAddMetadata = () => {
    setMetadata([...metadata, { color: "", size: "", quantity: 0 }]);
    setValidationErrors({
      ...validationErrors,
      metadata: [...validationErrors.metadata, { color: "", size: "", quantity: "" }],
    });
  };

  const handleRemoveMetadata = (index: number) => {
    setMetadata(metadata.filter((_, i) => i !== index));
    setValidationErrors({
      ...validationErrors,
      metadata: validationErrors.metadata.filter((_, i) => i !== index),
    });
  };

  const handleMetadataChange = (index: number, field: string, value: string | number) => {
    const newMetadata = metadata.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
    );
    setMetadata(newMetadata);

    const newErrors = validationErrors.metadata.map((item, i) =>
      i === index ? { ...item, [field]: "" } : item
    );
    setValidationErrors({ ...validationErrors, metadata: newErrors });
  };

  const validateForm = (form) => {
    let valid = true;
    let errors = {
      name: "",
      unitPrice: "",
      metadata: metadata.map(() => ({ color: "", size: "", quantity: "" })),
      imagesPath: "",
    };

    if (form.product_name.value.length < 3) {
      errors.name = "Product name must be at least 3 characters long.";
      valid = false;
    }

    if (isNaN(form.unit_price.value) || parseFloat(form.unit_price.value) <= 0) {
      errors.unitPrice = "Unit price must be a positive number.";
      valid = false;
    }

    metadata.forEach((item, index) => {
      if (item.color.trim() === "") {
        errors.metadata[index].color = "Color is required.";
        valid = false;
      }
      if (item.size.trim() === "") {
        errors.metadata[index].size = "Size is required.";
        valid = false;
      }
      if (isNaN(item.quantity) || item.quantity <= 0) {
        errors.metadata[index].quantity = "Quantity must be a positive number.";
        valid = false;
      }
    });

    if (form.images_path.value.trim() === "") {
      errors.imagesPath = "At least one image path is required.";
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (!validateForm(form)) {
      return;
    }

    const product = {
      name: form.product_name.value,
      unit_price: parseFloat(form.unit_price.value),
      metadata: metadata,
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
        setErrorMessage(""); // Clear any previous error message
        form.reset();
        setMetadata([{ color: "", size: "", quantity: 0 }]); // Reset metadata to one set
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to create product"); // Show the backend error message
      }
    } catch (error) {
      setErrorMessage("Failed to create product: " + error.message);
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
            onSubmit={handleProductSubmit}
            className="flex flex-col gap-6 p-8 bg-white shadow-md rounded-lg max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Add Product
          </h2>

          {/* Product Name and Unit Price */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full">
              <Label
                  htmlFor="product_name"
                  value="Product Name"
                  className="text-gray-700 font-medium text-l mb-2"
              />
              <TextInput
                  id="product_name"
                  name="product_name"
                  type="text"
                  placeholder="  Enter product name"
                  className="mt-1 block w-full  border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  // required
              />
              {validationErrors.name && (
              <p className="text-red-500 text-sm">{validationErrors.name}</p>
              )}
            </div>
            <div className="w-full">
              <Label
                  htmlFor="unit_price"
                  value="Unit Price"
                  className="text-gray-700 font-medium text-l mb-2"
              />
              <TextInput
                  id="unit_price"
                  name="unit_price"
                  type="number"
                  placeholder="  Enter unit price"
                  className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  // required
              />
              {validationErrors.unitPrice && (
              <p className="text-red-500 text-sm">{validationErrors.unitPrice}</p>
              )}
            </div>
          </div>

          {/* Dynamic Metadata Input Fields */}
          {metadata.map((item, index) => (
              <div key={index} className="flex flex-col lg:flex-row gap-6">
                <div className="w-full">
                  <Label
                      htmlFor={`color_${index}`}
                      value="Color"
                      className="text-gray-700 font-medium text-l mb-2"
                  />
                  <TextInput
                      id={`color_${index}`}
                      name={`color_${index}`}
                      type="text"
                      placeholder="  Enter color"
                      className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      value={item.color}
                      onChange={(e) => handleMetadataChange(index, "color", e.target.value)}
                      // required
                  />
                  {validationErrors.metadata[index]?.color && (
                    <p className="text-red-500 text-sm">{validationErrors.metadata[index].color}</p>
                   )}
                </div>
                <div className="w-full">
                  <Label
                      htmlFor={`size_${index}`}
                      value="Size"
                      className="text-gray-700 font-medium text-l mb-2"
                  />
                  <TextInput
                      id={`size_${index}`}
                      name={`size_${index}`}
                      type="text"
                      placeholder="  Enter size"
                      className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      value={item.size}
                      onChange={(e) => handleMetadataChange(index, "size", e.target.value)}
                      // required
                  />
                  {validationErrors.metadata[index]?.size && (
                    <p className="text-red-500 text-sm">{validationErrors.metadata[index].size}</p>
                  )}
                </div>
                <div className="w-full">
                  <Label
                      htmlFor={`quantity_${index}`}
                      value="Quantity"
                      className="text-gray-700 font-medium text-l mb-2"
                  />
                  <TextInput
                      id={`quantity_${index}`}
                      name={`quantity_${index}`}
                      type="number"
                      placeholder="  Enter quantity"
                      className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      value={item.quantity}
                      onChange={(e) => handleMetadataChange(index, "quantity", parseInt(e.target.value))}
                      // required
                  />
                  {validationErrors.metadata[index]?.quantity && (
                    <p className="text-red-500 text-sm">{validationErrors.metadata[index].quantity}</p>
                  )}
                </div>

                {/* + and - buttons for adding/removing metadata sets */}
                <div className="flex items-center">
                  <Button
                      type="button"
                      onClick={handleAddMetadata}
                      className="mt-4 bg-transparent hover:bg-green-200 text-green font-medium py-1 px-1 rounded-md"
                  >
                    <AiOutlinePlus />
                  </Button>
                  {metadata.length > 1 && (
                      <Button
                          type="button"
                          onClick={() => handleRemoveMetadata(index)}
                          className="mt-4 ml-2 bg-transparent hover:bg-red-200 text-red font-medium py-1 px-1 rounded-md"
                      >
                        <AiOutlineMinus />
                      </Button>
                  )}
                </div>
              </div>
          ))}

          {/* Category and Sub Category */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full">
              <Label
                  htmlFor="category"
                  value="Category"
                  className="text-gray-700 font-medium text-l mb-2"
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
                  className="text-gray-700 font-medium text-l mb-2"
              />
              <Select
                  id="sub_category"
                  name="sub_category"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                {subCategories.map((subCategory: SubCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <Label
                htmlFor="description"
                value="Description"
                className="text-gray-700 font-medium text-l mb-2"
            />
            <Textarea
                id="description"
                name="description"
                placeholder="  Enter product description"
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
            />
          </div>

          {/* Images Path */}
          <div className="w-full">
            <Label
                htmlFor="images_path"
                value="Images Path (comma-separated)"
                className="text-gray-700 font-medium text-l mb-2"
            />
            <Textarea
                id="images_path"
                name="images_path"
                placeholder="  Enter image paths separated by commas"
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                // required
            />
            {validationErrors.imagesPath && (
              <p className="text-red-500 text-sm">{validationErrors.imagesPath}</p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
              <div className="text-red-500 font-medium mb-4">
                {errorMessage}
              </div>
          )}

          {/* Success Message */}
          {showSuccessMessage && (
              <div className="text-green-500 font-medium mb-4 flex items-center">
                <PiCheckCircleBold className="mr-2" />
                Product created successfully!
              </div>
          )}

          {/* Submit Button */}
          <Button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Add Product
          </Button>
        </form>
      </div>
      </main>
      </div>
  );
};

export default CreateProduct;


