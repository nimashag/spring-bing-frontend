import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order } from "../../interfaces/Order";
import { motion } from "framer-motion";
import Loading from "../../components/Loading.tsx";
import Model from "../../components/Modal.tsx";
import currencyFormatter from "currency-formatter";
import SidebarComp from "../../dashboard/SidebarComp";

const OrderUpdateStatus: React.FunctionComponent = () => {
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);

        const order = await axios.get(
          `http://localhost:3000/order/getOneOrder/${id}`
        );
        setOrder(order.data);
        console.log(order);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [id]);

  return (
    <>
      <div className="dashboard-layout">
        <SidebarComp />
        <div className="main-content">
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full p-4 bg-white rounded-lg shadow-lg">
              <div className="mb-6 text-3xl font-semibold text-gray-800">
                <h1>
                  {currencyFormatter.format(order?.total_price, {
                    code: "USD",
                  })}{" "}
                  /=
                </h1>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700">
                        Item
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700">
                        Quantity
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orderProducts.map((item) => (
                      <tr
                        key={item.product_id._id}
                        className="hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 border-b border-gray-200">
                          <div className="flex items-center space-x-4">
                            <div className="relative overflow-visible w-12 h-12">
                              <img
                                src={item.product_id.images_path}
                                alt={item.product_id.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-125 hover:translate-x-1 hover:translate-y-1"
                              />
                            </div>
                            <span>{item.product_id.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200">
                          Rs. {item.product_id.unit_price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-12">
                  <strong>Delivery Address :</strong>&nbsp;&nbsp;
                  {order?.billing_address}
                  <div className="pt-4">
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
                  <div className="p-5">
                    <select
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                      className="text-gray-500 h-10 pl-4 pr-4 rounded-full shadow-sm w-48 border border-gray-300"
                    >
                      <option value={order?.order_status}>
                        {order?.order_status}
                      </option>
                      {order?.order_status !== "pre-confirmed" && (
                        <option value="pre-confirmed">pre-confirmed</option>
                      )}
                      {order?.order_status !== "confirmed" && (
                        <option value="confirmed">confirmed</option>
                      )}
                      {order?.order_status !== "processing" && (
                        <option value="processing">processing</option>
                      )}
                      {order?.order_status !== "packing" && (
                        <option value="packing">packing</option>
                      )}
                      {order?.order_status !== "on-delivery" && (
                        <option value="on-delivery">on-delivery</option>
                      )}
                      {order?.order_status !== "delivered" && (
                        <option value="delivered">delivered</option>
                      )}
                    </select>
                  </div>
                  <button
                    className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
                    onClick={() => setOpen(true)}
                  >
                    Update Order
                  </button>
                  <Model
                    open={open}
                    onClose={() => setOpen(false)}
                    order={order}
                    type="admin"
                    status={orderStatus}
                  ></Model>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderUpdateStatus;
