import * as React from "react";
import { useCartStore } from "../../store/cart-store";
import { ImCancelCircle } from "react-icons/im";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { enqueueSnackbar } from "notistack";
import currencyFormatter from 'currency-formatter';
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { cartItem } from "../../interfaces/Product";


interface ICartProps {}

const Cart: React.FunctionComponent<ICartProps> = (props) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
    user_id,
    selectedCartItem,
    removeProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    calculateTotal,
    addFromCart,
    cancelPay,
    clearSelectedCart,
  } = useCartStore((state) => ({
    user_id: state.user_id,
    cart: state.cart,
    totalPrice: state.totalPrice,
    selectedCartItem: state.selectedCartItem,
    removeProductFromCart: state.removeProductFromCart,
    increaseProductQuantity: state.increaseProductQuantity,
    decreaseProductQuantity: state.decreaseProductQuantity,
    calculateTotal: state.calculateTotal,
    addFromCart: state.addFromCart,
    cancelPay: state.cancelPay,
    clearSelectedCart: state.clearSelectedCartItem
  }));

  useEffect(() => {
    const handleCart = async () => {
      try {
        setLoading(true);
        /*console.log("Selected Items : ",selectedCartItem);*/

        if (cart.length < 0) {
          return 0;
        }
        /*console.log(cart);*/
        const addedProducts = cart.map((item) => ({
          product_id: item.product._id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        }));
        console.log(addedProducts);
        const checkCart = await axios.get(
          `http://localhost:3000/cart/get-cart/${user_id}`
        );

        if (checkCart.data.user_id == user_id) {
          await axios.put(`http://localhost:3000/cart/update-cart/${user_id}`, {
            added_products: addedProducts,
          });
          console.log("cart updated");
        } else {
          await axios.post(`http://localhost:3000/cart/add-cart`, {
            user_id: user_id,
            added_products: addedProducts,
          });
          console.log("cart created");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user_id) {
      handleCart();
      console.log("Selected Item : ",selectedCartItem);
    }
  }, [user_id, cart]);

  const removeItem = (productId: string) => {
    enqueueSnackbar("Product Removed", { variant: "error" });
    removeProductFromCart(productId);
    calculateTotal();
  };

  const removeQuantity = (item: cartItem) => {
    decreaseProductQuantity(item);
    calculateTotal();
  };

  const increaseQuantity = (item: cartItem) => {
    //console.log(item)
    increaseProductQuantity(item);
    calculateTotal();
  };

  const removeItemFromCart = (item_id: string) => {
    console.log(item_id)
    removeItem(item_id)
    calculateTotal()
  };

  const handleOrder = async () => {
    try {

      const added = selectedCartItem.map((item) => ({
        product_id: item.product._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size
      }));

      if(added.length == 0) {

        enqueueSnackbar('Select the product you want to buy', { variant:'error' });
         
      } else if(address == "") {

        enqueueSnackbar('Enter your address', { variant:'error' });

      }else{
        await axios.post("http://localhost:3000/order/create-order", {
          user_id: user_id,
          orderProducts: added,
          billing_address: address,
          order_status: "processing"
        });
        /* added.map((item) => {
          removeItemFromCart(item.product_id)
        }) */
        clearSelectedCart();
        navigate('/order/pendingOrder');
        console.log(added)
      }

    } catch (error) {
      console.log(error);
    }
  };


  const add = (item: cartItem) => {
   
    addFromCart(item)
    calculateTotal()
  }

  const cancel = () => {
    cancelPay()
    calculateTotal()
  }

  return (
    <>
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <table className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
      <tbody>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <tr key={index + 1} className="border-b">
              <td className="p-5">
                <div className="text-center font-medium text-gray-700">
                  {item.product.name}
                  <div className="border-2 border-black mt-2">
                    {item.color} -  {item.size}

                  </div>
                </div>
              </td>
              <td className="p-5">
                <img
                  src={item.product.images_path}
                  alt={item.product.name}
                  className="w-full h-40 object-cover rounded-md transition-transform duration-300 hover:scale-105"
                />
              </td>
              <td className="p-5">
                <span className="block mb-2 text-gray-700">
                  No of Items: {item.quantity}
                </span>
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="text-2xl text-green-500 hover:text-green-700"
                  >
                    <CiCirclePlus />
                  </button>
                  <button
                    onClick={() => removeQuantity(item)}
                    className="text-2xl text-red-500 hover:text-red-700"
                  >
                    <CiCircleMinus />
                  </button>
                </div>
              </td>
              <td className="p-5">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => removeItemFromCart(item.product._id,)}
                    className="text-2xl text-red-600 hover:text-red-800"
                  >
                    <ImCancelCircle />
                  </button>
                  <button
                    onClick={() => add(item)}
                    className="bg-green-300 text-white rounded-md px-3 py-1 hover:bg-green-500 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="p-10 text-center">
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="font-extrabold text-gray-600">
                  Cart is Empty
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {(cart.length > 0 || selectedCartItem.length > 0) && (
    <div className="max-w-4xl mx-auto p-5 mt-5 bg-white shadow-md rounded-lg">
      <div className="text-2xl mb-4">
        Total Price: <strong>{currencyFormatter.format(totalPrice.toFixed(2),{ code: 'USD' })}</strong>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Delivery Address:</label>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex gap-4">
        <button
          className="bg-yellow-400 text-white rounded-md px-4 py-2 hover:bg-yellow-500 transition-colors"
          onClick={handleOrder}
        >
          Pay
        </button>
        <button
          className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 transition-colors"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</>

  );
};

export default Cart;
