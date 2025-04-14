import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../store/CartContext';
// import jwt_decode from 'jwt-decode';

function Orders() {
  const { getAllOrdersOfUser } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getUserIdFromToken = () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'));
      console.log(token)
      if (!token) return null;
      return token.id || token._id; // depends on your token payload
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = getUserIdFromToken();
      console.log(userId)
      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        console.log(1)
        const data = await getAllOrdersOfUser(userId);
        console.log(data)
        setOrders(data.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getAllOrdersOfUser]);

  if (loading) return <div className="p-6 text-center">Loading your orders...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

      {orders?.length === 0 ? (
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-md"
            >
              <div className="mb-2 text-sm text-gray-500">
                Order ID: {order._id}
              </div>
              <div className="mb-2 text-sm text-gray-500">
                Placed On: {new Date(order.createdAt).toLocaleString()}
              </div>
              <div className="mb-2 text-sm font-medium">
                Status: <span className="text-green-600">{order.status}</span>
              </div>
              <div className="mb-2 text-sm">
                Address: <span className="text-gray-700">{order.address}</span>
              </div>

              <div className="mt-4 space-y-2">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-t pt-2 text-sm"
                  >
                    <div>
                      {/* <p className="font-medium">Product ID: {item.product}</p> */}
                      <p className="text-gray-500">
                        Color: {item.color} | Size: {item.size}
                      </p>
                    </div>
                    <div>
                      Qty: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
