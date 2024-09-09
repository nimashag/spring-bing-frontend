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
  const [imagesPath, setImagesPath] = useState(""); // New state for images_path
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Validation error states
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    // Fetch the product details to populate the form
    fetch(`http://localhost:3000/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        setMetadata(data.data.metadata); // Set the existing metadata
        setImagesPath(data.data.images_path.join(", ")); // Set images_path as comma-separated string
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
    if (metadata.length > 1) {
      const updatedMetadata = [...metadata];
      updatedMetadata.splice(index, 1);
      setMetadata(updatedMetadata);
    }
  };

  const validateForm = (updatedProduct) => {
    const newErrors: any = {};

    // Product Name Validation
    if (!updatedProduct.name || updatedProduct.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters long.";
    }

    // Unit Price Validation
    if (isNaN(updatedProduct.unit_price) || updatedProduct.unit_price <= 0) {
      newErrors.unit_price = "Unit price must be a positive number.";
    }

    // Metadata Validation (Color, Size, Quantity)
    updatedProduct.metadata.forEach((item, index) => {
      if (!item.color) {
        newErrors[`color-${index}`] = "Color cannot be empty.";
      }
      if (!item.size) {
        newErrors[`size-${index}`] = "Size cannot be empty.";
      }
      if (isNaN(item.quantity) || item.quantity <= 0) {
        newErrors[`quantity-${index}`] = "Quantity must be a positive number.";
      }
    });

    // Category and Subcategory Validation
    if (!updatedProduct.category || !updatedProduct.category.length) {
      newErrors.category = "Category is required.";
    }
    if (!updatedProduct.sub_category || !updatedProduct.sub_category.length) {
      newErrors.sub_category = "Subcategory is required.";
    }

    // Images Path Validation
    const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    updatedProduct.images_path.forEach((url, index) => {
      if (!urlRegex.test(url)) {
        newErrors[`images_path`] = "Each URL must be a valid web address.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    // Split the images_path by comma and trim any whitespace
    const imagesPathArray = imagesPath.split(",").map((url) => url.trim());

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
      images_path: imagesPathArray, // Use the array of URLs
    };

    if (!validateForm(updatedProduct)) {
      return;
    }

    fetch(`http://localhost:3000/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => {
        if (res.ok) {
          setShowSuccessMessage(true);
          setShowErrorMessage(false);
        } else {
          setShowErrorMessage(true);
          setShowSuccessMessage(false);
        }
        setTimeout(() => {
          setShowSuccessMessage(false);
          setShowErrorMessage(false);
        }, 5000);
      })
      .catch(() => {
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
        setTimeout(() => {
          setShowErrorMessage(false);
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
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
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
              defaultValue={product.unit_price}
              placeholder="Enter unit price"
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
              required
            />
            {errors.unit_price && (
              <p className="text-red-500 text-sm mt-1">{errors.unit_price}</p>
            )}
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
                {errors[`color-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`color-${index}`]}
                  </p>
                )}
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
                {errors[`size-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`size-${index}`]}
                  </p>
                )}
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
                {errors[`quantity-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`quantity-${index}`]}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <Button
                  type="button"
                  onClick={() => handleRemoveMetadata(index)}
                  className="bg-red-50 text-red-500 hover:bg-red-100"
                  disabled={metadata.length === 1}
                >
                  Remove
                </Button>
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
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
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
              {subCategories.map((subCat) => (
                <option key={subCat._id} value={subCat._id}>
                  {subCat.name}
                </option>
              ))}
            </Select>
            {errors.sub_category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sub_category}
              </p>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div>
          <Label
            htmlFor="description"
            value="Product Description"
            className="text-gray-700 font-medium mb-2"
          />
          <Textarea
            id="description"
            name="description"
            defaultValue={product.description}
            placeholder="Enter product description"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
            rows={5}
            required
          />
        </div>

        {/* Images Path */}
        <div>
          <Label
            htmlFor="images_path"
            value="Images Path"
            className="text-gray-700 font-medium mb-2"
          />
          <Textarea
            id="images_path"
            name="images_path"
            value={imagesPath}
            onChange={(e) => setImagesPath(e.target.value)}
            placeholder="Enter image URLs separated by commas"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 px-3 py-2"
            rows={5}
            required
          />
          {errors.images_path && (
            <p className="text-red-500 text-sm mt-1">{errors.images_path}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
        >
          Update Product
        </Button>

        {/* Success and Error Messages */}
        {showSuccessMessage && (
          <div className="flex items-center mt-4 text-green-500">
            <PiCheckCircleBold className="mr-2" />
            Product updated successfully!
          </div>
        )}
        {showErrorMessage && (
          <div className="flex items-center mt-4 text-red-500">
            <PiCheckCircleBold className="mr-2" />
            There was an error updating the product.
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateProduct;
