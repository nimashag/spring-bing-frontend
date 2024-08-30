import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { BiCartAdd } from "react-icons/bi";
import Product from "../../interfaces/Product";
import Category from "../../interfaces/Category";
import { useCartStore } from '../../store/cart-store';
import { enqueueSnackbar } from "notistack";

const ViewProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<{ [key: string]: string }>({});
    const [searchQuery, setSearchQuery] = useState("");

    const {cart,addProductToCart,calculateTotal} = useCartStore((state) => ({
        addProductToCart: state.addProductToCart,
        cart: state.cart,
        calculateTotal: state.calculateTotal
    }));

    useEffect(() => {
        fetch("http://localhost:3000/product")
            .then(res => res.json())
            .then(data => setProducts(data.data))
            .catch(error => {
                console.error('Error fetching products:', error);
                // TODO: Handle error, e.g., display an error message to the user
            });
        // Fetch categories and map them by their IDs
        fetch('http://localhost:3000/category')
            .then((res) => res.json())
            .then((data) => {
                const categoryMap = data.data.reduce((acc: { [key: string]: string }, category: Category) => {
                    acc[category._id] = category.name;
                    return acc;
                }, {});
                setCategories(categoryMap);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.unit_price.toString().includes(searchQuery) ||
        product.metadata.some(meta =>
            meta.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meta.size.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // add to cart method 
    const addToCart = (product: Product) => {
        enqueueSnackbar('Product added to cart', { variant:'success' });
        addProductToCart(product);
        calculateTotal();
        console.log(cart);
    }

    return (
        <div className='mt-28 px-4 lg:px-24'>
            <div className='flex justify-between items-start mb-8'>
                <h2 className='text-5xl font-bold'>Our Products</h2>
                <div className='flex flex-col items-end'>
                    <div className="relative w-96">
                        <input
                            type="text"
                            placeholder="Search Products"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='h-10 pl-10 pr-10 rounded-full shadow-sm w-full border border-gray-300'
                        />
                        <div className="absolute top-0 left-0 mt-2.5 ml-4 text-gray-500">
                            <FaSearch size="20px" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid gap-5 my-12 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
                {filteredProducts.map(product => (
                    <Card key={product._id} className="h-90 relative transition-shadow duration-300 ease-in-out hover:shadow-xl">
                        <div className="relative">
                            <Link to={`/product/${product._id}`}>
                                <img src={product.images_path[0]} alt={product.name} className='w-full h-90 object-cover object-center hover:opacity-100 hover:scale-105 transition duration-300' />
                            </Link>
                            <button className='absolute bottom-1 right-1 bg-green-500 text-white font-semibold w-12 h-12 rounded-full shadow-md hover:bg-green-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center' onClick={() => addToCart(product)}>
                                <BiCartAdd style={{ fontSize: '2rem', color: '#f1faf6' }} />
                            </button>
                        </div>
                        <div className="px-6 py-4">
                        <Link to={`/product/${product._id}`}>
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                                {product.name}
                            </h5>
                            <p className="text-sm text-gray-500 font-semibold">
                                <p><strong>Category: </strong>{categories[product.category[0]] || 'Unknown'}</p>
                                <p><strong>Price: </strong>LKR {product.unit_price}</p>
                            </p>
                        </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ViewProductsList;

