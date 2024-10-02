import * as React from "react";
import { useState, useEffect } from "react";
import { Order } from "../../interfaces/Order";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import SidebarComp from "../../dashboard/SidebarComp";
import currencyFormatter from "currency-formatter";
import { format } from "date-fns";

interface IOrdersProps {}

const Orders: React.FunctionComponent<IOrdersProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Order[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState("");

  const ordersPerPage = 10;

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:3000/order/getAllOrders`,
          {
            params: {
              page: pageNumber,
              limit: ordersPerPage,
            },
          }
        );

        setData(response.data.orders);
        console.log(data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [pageNumber]);

  const filteredOrders = data.filter((order) => {
    return statusFilter === "" ? true : order.order_status === statusFilter;
  });

  const displayOrders = filteredOrders.map((order, index) => (
    <tr
      key={order._id}
      className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
    >
      <td className="py-3 px-4 text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="py-3 px-4 text-sm font-medium text-gray-900">
        <Link to={`/order/viewOrder/${order._id}`}>{order._id}</Link>
      </td>
      <td className="py-3 px-4 text-sm font-medium text-gray-900">
        {order.order_status}
      </td>
      <td className="py-3 px-4 text-sm font-medium text-gray-900">
        {format(new Date(order.purchase_date), "yyyy-MM-dd")}
      </td>
      <td className="py-3 px-4 text-sm font-medium text-gray-900">
        {currencyFormatter.format(order.total_price, { code: "USD" })}
      </td>

      <td className="py-3 px-4 text-sm font-medium text-gray-900">
        <Link to={`/admin/order/updateOrderStatus/${order._id}`}>
          <button className="text-cyan-600 font-medium hover:underline">
            Edit
          </button>
        </Link>
      </td>
    </tr>
  ));

  const changePage = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };

  return (
    <div className="dashboard-layout">
      <SidebarComp />

      <div className="main-content">
        <h2 className="text-3xl font-bold">Manage Your Orders</h2>
        <div className="flex justify-between p-8">
          <Link to={`/admin/order/FinanceReport/`}>
            <button className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors">
              Finance Report
            </button>
          </Link>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-gray-500 h-10 pl-4 pr-4 rounded-full shadow-sm w-48 border border-gray-300"
            >
              <option value="">All Statuses</option>
              <option value="pre-confirmed">pre-confirmed</option>
              <option value="processing">processing</option>
              <option value="confirmed">confirmed</option>
              <option value="packing">packing</option>
              <option value="on-delivery">on-delivery</option>
              <option value="delivered">delivered</option>
            </select>
          </div>
        </div>

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
                  Order Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Total Amount
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{loading ? <Loading /> : displayOrders}</tbody>
          </table>
        </div>
        <div className="p-5">
          <ReactPaginate
            className="flex justify-center space-x-2 mt-4"
            previousLabel={
              <button className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors">
                Previous
              </button>
            }
            nextLabel={
              <button className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors">
                Next
              </button>
            }
            pageCount={totalPages}
            onPageChange={changePage}
            containerClassName="flex space-x-2"
            activeClassName="bg-black text-white"
            pageClassName="px-3 py-1 border border-gray-300 hover:bg-blue-100"
            breakClassName="px-3 py-1"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
