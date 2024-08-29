import * as React from 'react';
import { useCartStore } from '../../store/cart-store';

interface ICartProps {
}

const Cart: React.FunctionComponent<ICartProps> = (props) => {

    const {cart,removeProductFromCart} = useCartStore((state) => ({
        cart: state.cart,
        removeProductFromCart: state.removeProductFromCart,
    }))


  return (
    <div className='flex justify-center items-center min-h-screen'>
        <table>
        <tbody>
        {cart.map((item) => (
            <tr key={item.product._id} className='h=80 w=60 gap-4'>
            <td className='m'>
                <div className='p-5'>
                {item.product.name}
                </div>
            </td>
            <td>
                <div className='p-5'>
                <img src={item.product.images_path} alt="image" className='w-full h-60 object-cover object-center transition duration-300'/>
                </div>
            </td>
            <td>
                <div className='p-5'>
                <span>No of Items : {item.quantity}</span>
                </div>
            </td>
            <td>
                <div className='p-5'>
                
                </div>
            </td>

        </tr>
        ))} 
        </tbody> 
    </table>
    </div>
    
  );
};

export default Cart;
