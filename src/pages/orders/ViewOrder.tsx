import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from '../../interfaces/Order';
import { motion } from 'framer-motion';

interface IViewOrderProps {
    
}

const ViewOrder: React.FunctionComponent<IViewOrderProps> = (props) => {

    const [order, setOrder] = useState<Order>();
    const [loading, setLoading] = useState<boolean>(false);

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        const getOrder = async () => {
            try {

                setLoading(true);

                const order = await axios.get(`http://localhost:3000/order/getOneOrder/${id}`);
                setOrder(order.data)
                console.log(order);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getOrder();
    },[id])


  return (
    <div className='w-full p-4 bg-white rounded-lg shadow-lg'>
    <div className='mb-6 text-3xl font-semibold text-gray-800'>
        <h1>RS. {order?.total_price} /=</h1>
    </div>
    <div className='bg-slate-50 p-4 rounded-lg'>
        <table className='min-w-full border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
                <tr>
                    <th className='py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700'>Item</th>
                    <th className='py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700'>Quantity</th>
                    <th className='py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700'>Price</th>
                </tr>
            </thead>
            <tbody>
                {order?.orderProducts.map((item) => (
                    <tr key={item.product_id._id} className='hover:bg-gray-50'>
                        <td className='py-3 px-4 border-b border-gray-200'>
                            <div className='flex items-center space-x-4'>
                                <div className='relative overflow-visible w-12 h-12'>
                                    <img
                                        src={item.product_id.images_path}
                                        alt={item.product_id.name}
                                        className='w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-125 hover:translate-x-1 hover:translate-y-1'
                                    />
                                </div>
                                <span>{item.product_id.name}</span>
                            </div>
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200'>{item.quantity}</td>
                        <td className='py-3 px-4 border-b border-gray-200'>Rs. {item.product_id.unit_price * item.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className='mt-12'>
            <strong>Delivery Address :</strong>&nbsp;&nbsp;{order?.billing_address} 
            <div className='pt-4'>
            <motion.div
            className="m-6 w-24 h-12 text-black font-bold flex items-center justify-center"
            animate={{
            scale: [1, 1.2, 1],
            }}
            transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            }}
            >
            {order?.order_status}
            </motion.div>

            </div>
        </div>        

    </div>
</div>



  );
};

export default ViewOrder;