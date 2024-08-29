import React, { useState, useEffect } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useParams } from "react-router-dom";
import { PiCheckCircleBold } from "react-icons/pi";

const UpdateProduct: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Fetch the product details to populate the form
    fetch(`http://localhost:3000/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data);
          setMetadata(data.data.metadata); // Set the existing metadata
        });

    // Fetch categories and subcategories
    fetch("http://localhost:3000/category")
        .then((res) => res.json())
        .then((data) => setCategories(data.data));

    fetch("http://localhost:3000/subcategory")
        .then((res) => res.json())
        .then((data) => setSubCategories(data.data));
  }, [id]);

  const handleMetadataChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMetadata = [...metadata];
    updatedMetadata[index][name] = value;
    setMetadata(updatedMetadata);
  };

  const handleAddMetadata = () => {
    setMetadata([...metadata, { color: "", size: "", quantity: "" }]);
  };

  const handleRemoveMetadata = (index) => {
    const updatedMetadata = [...metadata];
    updatedMetadata.splice(index, 1);
    setMetadata(updatedMetadata);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedProduct = {
      name: form.name.value,
      unit_price: parseFloat(form.unit_price.value),
      metadata: metadata.map((item) => ({
        color: item.color,
        size: item.size,
        quantity: parseFloat(item.quantity),
      })),
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

          {/* Dynamic Metadata Fields */}
          <div className="flex flex-col gap-6">
            {metadata.map((item, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full">
                    <Label
                        htmlFor={`color-${index}`}
                        value="Color"
                        className="text-gray-700 font-medium mb-2"
                    />
                    <TextInput
                        id={`color-${index}`}
                        name="color"
                        type="text"
                        value={item.color}
                        onChange={(event) => handleMetadataChange(index, event)}
                        placeholder="Enter color"
                        className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
                        required
                    />
                  </div>
                  <div className="w-full">
                    <Label
                        htmlFor={`size-${index}`}
                        value="Size"
                        className="text-gray-700 font-medium mb-2"
                    />
                    <TextInput
                        id={`size-${index}`}
                        name="size"
                        type="text"
                        value={item.size}
                        onChange={(event) => handleMetadataChange(index, event)}
                        placeholder="Enter size"
                        className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
                        required
                    />
                  </div>
                  <div className="w-full">
                    <Label
                        htmlFor={`quantity-${index}`}
                        value="Quantity"
                        className="text-gray-700 font-medium mb-2"
                    />
                    <TextInput
                        id={`quantity-${index}`}
                        name="quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(event) => handleMetadataChange(index, event)}
                        placeholder="Enter quantity"
                        className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
                        required
                    />
                  </div>
                  <div className="flex items-center">
                    {index > 0 && (
                        <Button
                            type="button"
                            onClick={() => handleRemoveMetadata(index)}
                            className="bg-red-50 text-red-500 hover:bg-red-100"
                        >
                          Remove
                        </Button>
                    )}
                  </div>
                </div>
            ))}
            <div className="flex justify-end">
              <Button
                  type="button"
                  onClick={handleAddMetadata}
                  className="w-1/4 bg-blue-50 text-blue-500 mt-2 rounded-md hover:bg-blue-100"
              >
                Add Metadata
              </Button>
            </div>
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
          </div>

          {/* Images Path */}
          <div className="w-full">
            <Label
                htmlFor="images_path"
                value="Images Path"
                className="text-gray-700 font-medium mb-2"
            />
            <TextInput
                id="images_path"
                name="images_path"
                type="text"
                defaultValue={product.images_path[0]}
                placeholder="Enter images path"
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
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
                defaultValue={product.description}
                placeholder="Enter product description"
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
                rows={4}
                required
            />
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4 rounded-md">
                <PiCheckCircleBold className="inline-block mr-2" />
                Product updated successfully!
              </div>
          )}

          {/* Submit Button */}
          <Button
              type="submit"
              className="bg-green-500 text-white mt-4 rounded-md hover:bg-green-600"
          >
            Update Product
          </Button>
        </form>
      </div>
  );
};

export default UpdateProduct;

