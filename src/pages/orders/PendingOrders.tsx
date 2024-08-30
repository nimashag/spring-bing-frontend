import * as React from "react";
import { useCartStore } from "../../store/cart-store";
import { useState, useEffect } from "react";
import { Order } from "../../interfaces/Order";
import axios from "axios";
import { Table } from "flowbite-react";
import { format } from "date-fns";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

interface IPendingOrdersProps {}

const PendingOrders: React.FunctionComponent<IPendingOrdersProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);

  const { user_id } = useCartStore((state) => ({
    user_id: state.user_id,
  }));

  const clearPersistedState = () => {
    useCartStore.persist.clearStorage();
  };

  useEffect(() => {
    clearPersistedState();
    const getPendingOrders = async () => {
      try {
        setLoading(true);
        console.log(user_id);
        const response = await axios.get(
          `http://localhost:3000/order/get-pending-order/${user_id}`
        );
        console.log(response);
        if (!response) {
          console.log(response);
        }

        setPendingOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPendingOrders();
  }, [user_id]);

  return (
    <div>
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
        </div>
      </div>
      {loading ? (
        <Loading/>
      ) : (
        <div className="flex justify-center items-center">
          <Table className="w-full lg:w-[1180px] table-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <Table.Head className="bg-sky-700 text-white">
              <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
                Number
              </Table.HeadCell>

              <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
                Order
              </Table.HeadCell>

              <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </Table.HeadCell>

              <Table.HeadCell className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </Table.HeadCell>
            </Table.Head>

            {pendingOrders.map((order, index) => (
              <Table.Body className="divide-y" key={order._id}>
                <Table.Row className="bg-white hover:bg-gray-100 transition duration-300">
                  <Table.Cell className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {index + 1}
                  </Table.Cell>

                  <Table.Cell className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    <Link to={`/order/viewOrder/${order._id}`}>
                    {order._id}
                    </Link>
                  </Table.Cell>

                  <Table.Cell className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {format(new Date(order.purchase_date), "yyyy-mm-dd")}
                  </Table.Cell>

                  <Table.Cell className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    <div className="flex gap-3">
                        <button className="text-cyan-600 font-medium hover:underline">
                        Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded transition duration-300">
                        Delete
                        </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
