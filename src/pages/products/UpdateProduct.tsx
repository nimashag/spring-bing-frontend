import React, { useState, useEffect } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useParams } from "react-router-dom";
import { PiCheckCircleBold } from "react-icons/pi";

const UpdateProduct: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Fetch the product details to populate the form
    fetch(`http://localhost:3000/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data));

    // Fetch categories and subcategories
    fetch("http://localhost:3000/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.data));

    fetch("http://localhost:3000/subcategory")
      .then((res) => res.json())
      .then((data) => setSubCategories(data.data));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedProduct = {
      name: form.name.value,
      unit_price: parseFloat(form.unit_price.value),
      metadata: [
        {
          color: form.color.value,
          size: form.size.value,
          quantity: parseFloat(form.quantity.value),
        },
      ],
      description: form.description.value,
      category: [form.category.value],
      sub_category: [form.sub_category.value],
      images_path: [form.images_path.value],
    };

    fetch(`http://localhost:3000/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then(() => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="px-4 my-12">
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-6 p-8 bg-white shadow-md rounded-lg max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Update Product
        </h2>

        {/* Product Name and Unit Price */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <Label
              htmlFor="name"
              value="Product Name"
              className="text-gray-700 font-medium mb-2"
            />
            <TextInput
              id="name"
              name="name"
              type="text"
              defaultValue={product.name}
              placeholder="Enter product name"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
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
              step="0.01"
              defaultValue={product.unit_price}
              placeholder="Enter unit price"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
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
              defaultValue={product.metadata[0].color}
              placeholder="Enter color"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
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
              defaultValue={product.metadata[0].size}
              placeholder="Enter size"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Quantity and Category */}
        <div className="flex flex-col lg:flex-row gap-6">
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
              defaultValue={product.metadata[0].quantity}
              placeholder="Enter quantity"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
              required
            />
          </div>
          <div className="w-full">
            <Label
              htmlFor="category"
              value="Category"
              className="text-gray-700 font-medium mb-2"
            />
            <Select
              id="category"
              name="category"
              defaultValue={product.category[0]}
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
              required
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Sub Category and Images Path */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <Label
              htmlFor="sub_category"
              value="Sub Category"
              className="text-gray-700 font-medium mb-2"
            />
            <Select
              id="sub_category"
              name="sub_category"
              defaultValue={product.sub_category[0]}
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
              required
            >
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="w-full">
            <Label
              htmlFor="images_path"
              value="Image URL"
              className="text-gray-700 font-medium mb-2"
            />
            <TextInput
              id="images_path"
              name="images_path"
              type="text"
              defaultValue={product.images_path[0]}
              placeholder="Enter image URL"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
              required
            />
          </div>
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
            defaultValue={product.description}
            placeholder="Enter product description"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            className="w-full lg:w-48 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update Product
          </Button>
        </div>
      </form>

      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg flex items-center">
          <PiCheckCircleBold className="h-6 w-6 mr-2" />
          <span className="text-lg">Product Updated Successfully!</span>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
