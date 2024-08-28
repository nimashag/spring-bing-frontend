import React, {useEffect, useState} from 'react';
import {Table} from 'flowbite-react';
import {FaSearch} from "react-icons/fa";
import Product from "../../interfaces/Product.tsx";
import { Link } from 'react-router-dom';

const ManageProducts: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/product')
            .then(res => res.json())
            .then(data => setProducts(data.data))
            .catch(error => {
                console.error('Error fetching products:', error);
                // TODO: Handle error, e.g., display an error message to the user
            });
    }, []);

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.metadata.some(meta =>
            meta.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meta.size.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        product.unit_price.toString().includes(searchQuery)
    );

    return (
        <div className='px-4 my-12'>
            <div className='flex justify-between items-start mb-8'>
                <h2 className='text-3xl font-bold'>Manage Your Products</h2>

                {/* Search bar */}
                <div className="relative w-96 mb-4">
                    <input
                        type="text"
                        placeholder="Search Products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300'
                    />
                    <div className="absolute top-0 left-0 mt-2.5 ml-4 text-gray-500">
                        <FaSearch size="20px"/>
                    </div>
                </div>
            </div>

            <br/>

            {/* Table */}
            <Table className='lg:w-[1180px]'>
                <Table.Head>
                    <Table.HeadCell>Number</Table.HeadCell>
                    <Table.HeadCell>Product Name</Table.HeadCell>
                    <Table.HeadCell>Unit Price</Table.HeadCell>
                    <Table.HeadCell>Color</Table.HeadCell>
                    <Table.HeadCell>Size</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                    <Table.HeadCell><span>Edit Or Delete</span></Table.HeadCell>
                </Table.Head>

                {filteredProducts.map((product, index) => (
                    <Table.Body className="divide-y" key={product._id}>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell
                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index + 1}</Table.Cell>
                            <Table.Cell
                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{product.name}</Table.Cell>
                            <Table.Cell>{product.unit_price}</Table.Cell>
                            <Table.Cell>{product.metadata.map(meta => meta.color).join(', ')}</Table.Cell>
                            <Table.Cell>{product.metadata.map(meta => meta.size).join(', ')}</Table.Cell>
                            <Table.Cell>{product.metadata.map(meta => meta.quantity).reduce((acc, qty) => acc + qty, 0)}</Table.Cell>
                            <Table.Cell>
                                <Link to={`/update-product/${product._id}`}>
                                    <button
                                        className='font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5'>
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>Delete
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
    )
}

export default ManageProducts