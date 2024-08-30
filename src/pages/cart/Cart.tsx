import * as React from "react";
import { useCartStore } from "../../store/cart-store";
import { ImCancelCircle } from "react-icons/im";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface ICartProps {}

const Cart: React.FunctionComponent<ICartProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    cart,
    totalPrice,
    user_id,
    removeProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    calculateTotal,
  } = useCartStore((state) => ({
    user_id: state.user_id,
    cart: state.cart,
    totalPrice: state.totalPrice,
    removeProductFromCart: state.removeProductFromCart,
    increaseProductQuantity: state.increaseProductQuantity,
    decreaseProductQuantity: state.decreaseProductQuantity,
    calculateTotal: state.calculateTotal,
  }));

  useEffect(() => {
    const handleCart = async () => {
      try {
        setLoading(true);

        const addedProducts = cart.map((item) => ({
          product_id: item.product._id,
          quantity: item.quantity,
        }));

        const checkCart = await axios.get(
          `http://localhost:3000/cart/get-cart/${user_id}`
        );

        console.log(checkCart.data);

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
    }
  }, [user_id, cart]);

  const removeItem = (productId: string) => {
    enqueueSnackbar("Product Removed", { variant: "error" });
    removeProductFromCart(productId);
    calculateTotal();
  };

  const removeQuantity = (productId: string) => {
    decreaseProductQuantity(productId);
    calculateTotal();
  };

  const increaseQuantity = (productId: string) => {
    increaseProductQuantity(productId);
    calculateTotal();
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <table>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item.product._id} className="h=80 w=60 gap-4">
                  <td className="m">
                    <div className="p-5 text-center">{item.product.name}</div>
                  </td>
                  <td>
                    <div className="p-5">
                      <img
                        src={item.product.images_path}
                        alt="image"
                        className="w-full h-60 object-cover object-center transition duration-300"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="p-5">
                      <span>No of Items : {item.quantity}</span>
                      <div className="flex justify-center items-center gap-4">
                        <div style={{ fontSize: "1.5rem" }}>
                          <button
                            onClick={() => increaseQuantity(item.product._id)}
                          >
                            <CiCirclePlus />
                          </button>
                        </div>
                        <div style={{ fontSize: "1.5rem" }}>
                          <button
                            onClick={() => removeQuantity(item.product._id)}
                          >
                            <CiCircleMinus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="p-5" style={{ fontSize: "1.5rem" }}>
                      <button onClick={() => removeItem(item.product._id)}>
                        <ImCancelCircle className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <div>
                <motion.div
                  className="text-6xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="font-extrabold" style={{ fontSize: "2rem" }}>
                    Cart is Empty
                  </div>
                </motion.div>
              </div>
            )}
          </tbody>
        </table>
      </div>
      {cart.length > 0 && <div>Total Price: ${totalPrice.toFixed(2)}</div>}
    </>
  );
};

export default Cart;
