import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import Product from "../../interfaces/Product.tsx";
import { Link } from "react-router-dom";

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/product")
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        // TODO: Handle error, e.g., display an error message to the user
      });
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.metadata.some(
        (meta) =>
          meta.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meta.size.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      product.unit_price.toString().includes(searchQuery)
  );

  // Handle the deletion of a product
  const handleDelete = (productId: string) => {
    fetch(`http://localhost:3000/product/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product Deleted") {
          // Remove the deleted product from the state
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          console.error("Failed to delete the product:", data.message);
          // TODO: Handle the error, e.g., display an error message to the user
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // TODO: Handle the error, e.g., display an error message to the user
      });
  };

  return (
    <div className="px-4 my-12">
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-bold">Manage Your Products</h2>

        {/* Search bar */}
        <div className="relative w-96 mb-4">
          <input
            type="text"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300"
          />
          <div className="absolute top-0 left-0 mt-2.5 ml-4 text-gray-500">
            <FaSearch size="20px" />
          </div>
        </div>
      </div>

      <br />

      {/* Table */}
      <div className="flex justify-center items-center min-h-screen">
      <Table className="w-full lg:w-[1180px] table-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <Table.Head className="bg-sky-700 text-white">
          <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
            Number
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
            Product Name
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
            Unit Price
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
            Color
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
            Size
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
            Quantity
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
            <span>Edit Or Delete</span>
          </Table.HeadCell>
        </Table.Head>

        {filteredProducts.map((product, index) => (
          <Table.Body className="divide-y" key={product._id}>
            <Table.Row className="bg-white hover:bg-gray-100 transition duration-300">
              <Table.Cell className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {product.name}
              </Table.Cell>
              <Table.Cell className="px-6 py-4 text-gray-700">
                {product.unit_price}
              </Table.Cell>
              <Table.Cell className="px-6 py-4 text-gray-700">
                {product.metadata.map((meta) => meta.color).join(", ")}
              </Table.Cell>
              <Table.Cell className="px-6 py-4 text-gray-700">
                {product.metadata.map((meta) => meta.size).join(", ")}
              </Table.Cell>
              <Table.Cell className="px-6 py-4 text-gray-700">
                {product.metadata
                  .map((meta) => meta.quantity)
                  .reduce((acc, qty) => acc + qty, 0)}
              </Table.Cell>
              <Table.Cell className="px-6 py-4 flex gap-4">
                <Link to={`/update-product/${product._id}`}>
                  <button className="text-cyan-600 font-medium hover:underline">
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded transition duration-300"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      </div>
    </div>
  );
};

export default ManageProducts;
