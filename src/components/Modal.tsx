import * as React from "react";
import { Order } from "../interfaces/Order";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

interface IModalProps {
  open: boolean;
  onClose: () => void;
  order: Order;
  type: string;
  status?: string;
}

const Modal: React.FunctionComponent<IModalProps> = ({
  open,
  onClose,
  order,
  type,
  status,
}) => {
  const navigate = useNavigate();

  const confirmOrder = async (order: Order) => {
    try {
      const id = order._id;

      await axios.put(`http://localhost:3000/order/confirmOrder/${id}`);

      navigate("/order/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (order_status: string) => {
    try {
      const id = order._id;
      console.log(order_status);
      await axios.put(`http://localhost:3000/order/updateOrderStatus/${id}`, {
        order_status,
      });

      navigate("/admin/orders");
      enqueueSnackbar("Delivery address updated successfully", {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!open) return null;
  console.log("order is ", order);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <button
            className="text-gray-400 hover:text-gray-600 text-xl"
            onClick={onClose}
          >
            X
          </button>
        </div>
        {type === "user" && (
          <>
            <div className="relative border-b pb-3">
              <h3 className="text-xl font-semibold text-center">
                Confirm Order
              </h3>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                Are you sure you want to confirm the order?
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
                onClick={() => {
                  confirmOrder(order);
                }}
              >
                Confirm
              </button>
            </div>
          </>
        )}

        {type === "admin" && (
          <>
            <div className="relative border-b pb-3">
              <h3 className="text-xl font-semibold text-center">
                Update Order
              </h3>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                Are you sure you want to update the order?
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
                onClick={() => {
                  updateOrderStatus(status);
                }}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
