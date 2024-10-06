import * as React from "react";
import { useCartStore } from "../../store/cart-store";
import { useState, useEffect } from "react";
import { Order } from "../../interfaces/Order";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import currencyFormatter from "currency-formatter";
import { format } from "date-fns";

interface IPendingOrdersProps {}

const PendingOrders: React.FunctionComponent<IPendingOrdersProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  const { user_id } = useCartStore((state) => ({
    user_id: state.user_id,
  }));

  const id = JSON.parse(localStorage.getItem("profile") || "")._id;
  const { setUserId } = useCartStore();

  useEffect(() => {
    setUserId(id); //'66d196a444e126395cbed7d9'
    const getPendingOrders = async () => {
      try {
        setLoading(true);
        console.log(user_id);
        const response = await axios.get(
          `http://localhost:3000/order/get-pending-order/${user_id}`
        );

        console.log(response);
        if (response && response.data) {
          setPendingOrders(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user_id) {
      getPendingOrders();
    }
  }, [user_id]);

  return (
    <div>
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
        </div>
        <div className="flex justify-end items-end p-5">
          <button
            className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
            onClick={() => navigate("/order/orderHistory")}
          >
            Order History
          </button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Number
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Total Amount
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    <Link to={`/order/viewOrder/${order._id}`}>
                      {order._id}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {format(new Date(order.purchase_date), "yyyy-MM-dd")}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {currencyFormatter.format(order.total_price, {
                      code: "USD",
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    <div className="flex gap-3">
                      <Link to={`/order/updateOrder/${order._id}`}>
                        <button className="text-cyan-600 font-medium hover:underline">
                          Edit
                        </button>
                      </Link>
                      {/* <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded transition duration-300">
                    Delete
                  </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
