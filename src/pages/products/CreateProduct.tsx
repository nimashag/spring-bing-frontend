import React, { useState, useEffect } from 'react';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { PiCheckCircleBold } from "react-icons/pi";
import Category from "../../interfaces/Category.tsx";
import SubCategory from "../../interfaces/SubCategory.tsx";

const CreateProduct: React.FC = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Fetch categories
        fetch('http://localhost:3000/category')
            .then(response => response.json())
            .then(data => {
                setCategories(data.data);
                setSelectedCategory(data.data[0]._id); // Select first category by default
            })
            .catch(error => console.error('Error fetching categories:', error));

        // Fetch subcategories
        fetch('http://localhost:3000/subcategory')
            .then(response => response.json())
            .then(data => {
                setSubCategories(data.data);
                setSelectedSubCategory(data.data[0]._id); // Select first subcategory by default
            })
            .catch(error => console.error('Error fetching subcategories:', error));
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
                    quantity: parseInt(form.quantity.value, 10)
                }
            ],
            description: form.description.value,
            category: [selectedCategory],
            sub_category: [selectedSubCategory],
            images_path: form.images_path.value.split(',').map(path => path.trim())
        };

        try {
            const response = await fetch('http://localhost:3000/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                setShowSuccessMessage(true);
                form.reset();
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                console.error('Failed to create product');
            }
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Create Product</h2>

            <form onSubmit={handleProductSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                {/* First Row */}
                <div className='flex gap-8'>
                    {/* Product Name */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="product_name" value="Product Name" />
                        </div>
                        <TextInput id="product_name" name='product_name' type="text" placeholder="Product Name" required />
                    </div>

                    {/* Unit Price */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="unit_price" value="Unit Price" />
                        </div>
                        <TextInput id="unit_price" name='unit_price' type="number" placeholder="Unit Price" required />
                    </div>
                </div>

                {/* Second Row */}
                <div className='flex gap-8'>
                    {/* Color */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="color" value="Color" />
                        </div>
                        <TextInput id="color" name='color' type="text" placeholder="Color" required />
                    </div>

                    {/* Size */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="size" value="Size" />
                        </div>
                        <TextInput id="size" name='size' type="text" placeholder="Size" required />
                    </div>
                </div>

                {/* Third Row */}
                <div className='flex gap-8'>
                    {/* Quantity */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="quantity" value="Quantity" />
                        </div>
                        <TextInput id="quantity" name='quantity' type="number" placeholder="Quantity" required />
                    </div>
                </div>

                {/* Fourth Row */}
                <div className='flex gap-8'>
                    {/* Category */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="category" value="Category" />
                        </div>
                        <Select id='category' name='category' value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                            {
                                categories.map((category: Category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))
                            }
                        </Select>
                    </div>

                    {/* Sub Category */}
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="sub_category" value="Sub Category" />
                        </div>
                        <Select id='sub_category' name='sub_category' value={selectedSubCategory} onChange={e => setSelectedSubCategory(e.target.value)}>
                            {
                                subCategories.map((subcategory: SubCategory) => (
                                    <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                                ))
                            }
                        </Select>
                    </div>
                </div>

                {/* Fifth Row */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="images_path" value="Images Path (comma separated)" />
                    </div>
                    <TextInput id="images_path" name='images_path' type="text" placeholder="e.g., path/to/image1.jpg, path/to/image2.jpg" required />
                </div>

                {/* Sixth Row - Description */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Product Description" />
                    </div>
                    <Textarea id="description" name='description' placeholder="Write Your Product Description" required className='w-full' rows={6} />
                </div>

                {/* Submit Button */}
                <div className='flex justify-end items-center space-x-4 px-4 lg:px-1'>
                    <Button type="submit" className='w-48 h-10 bg-green-500'>Create Product</Button>
                </div>
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

export default CreateProduct