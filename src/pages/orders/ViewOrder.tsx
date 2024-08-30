import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from '../../interfaces/Order';


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
    <div className='w-full'>
        <div className='mb-3'>
            <h1>{order?._id}</h1>
        </div>
        <div className='bg-slate-50'>
            
        </div>
    </div>
  );
};

export default ViewOrder;