import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full border ml-20">
          <AdminMenu />
          <thead className="w-full border">
            <tr className="mb-[4rem]">
              <th className="text-left ">ITEMS</th>
              {/* <th className="text-left pl-1">ID</th> */}
              <th className="text-left ">USER</th>
              <th className="text-left ">DATA</th>
              <th className="text-left ">TOTAL</th>
              <th className="text-left ">PAID</th>
              <th className="text-left ">DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                {/* <td>{order._id}</td> */}
                <td>{order.user ? order.user.username : "N/A"}</td>

                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td> ${order.totalPrice}</td>
                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[5rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[5rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[5rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[5rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="text-left">
                  <p className="p-1 text-center bg-pink-400 w-[5rem] rounded-full">
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default OrderList;
