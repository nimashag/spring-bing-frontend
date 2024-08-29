import * as React from 'react';
import {dummyProducts} from '../Data/productData';
import { useCartStore } from '../store/cart-store';

interface IProductListProps {
}

const ProductList: React.FunctionComponent<IProductListProps> = () => {

    const {cart,itemCount, addProductToCart, clearCart, removeProductFromCart} = useCartStore((state) => ({
        cart : state.cart,
        itemCount: state.itemCount,
        addProductToCart: state.addProductToCart,
        clearCart: state.clearCart,
        removeProductFromCart :state.removeProductFromCart
    }))

  return (
    <div>
        <h1 className='font-bold'>Product List</h1>
        <div className='flex gap-6 flex-col sm:flex-row'>
        {dummyProducts.map((product) => (
                <div className="h-66 w-66 bg-slate-500 gap-4 p-4" key={product.id}>
                <h3 className='font-extrabold pb-5'>{product.name}</h3>
                <div className='text-center'>
                    <p  >{product.description}</p>
                    <button className='bg-teal-500 p-2 mt-5 hover:bg-teal-600' 
                    onClick={() => addProductToCart(product)}
                    >Add to cart</button>
                </div>
            </div>
            
        ))}
        </div>
        <div>
            Cart Count : {itemCount}

            <div>
                {cart.map((item) => (
                    <div key={item.product.id}>
                        <p>{item.product.name}</p>
                        <p>{item.quantity}</p>
                        <button className='bg-red-500 p-2 mt-5 hover:bg-red-600' onClick={() => removeProductFromCart(item.product.id)}> remove items</button>
                    </div>
                ))}
            </div>

            <button className='bg-red-500 p-2 mt-5 hover:bg-red-600' onClick={(clearCart)}> Clear Cart</button>
        </div>

    </div>
  );
};

export default ProductList;
