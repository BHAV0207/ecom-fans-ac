import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../store/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart  ,createOrder} = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!address) {
      setMessage('Please enter a delivery address.');
      return;
    }

    setLoading(true);
    setMessage('');
    console.log(cartItems);
    try {
      console.log("1");
      const response = await createOrder(address);
      console.log("2");
      if (response) {
        clearCart();

        setMessage('Order placed successfully!');

        setTimeout(() => {
          navigate('/user/orders');
          setMessage('');
        }, 2000);
      } else {
        setMessage('Failed to place order. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred while placing the order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Color: {item.selectedColor} | Size: {item.selectedSize}
                  </p>
                  <p className="text-sm">₹{item.price} x {item.quantity}</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(index, parseInt(e.target.value) || 1)
                    }
                    className="w-16 border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Enter delivery address"
              className="w-full border px-4 py-2 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Total: ₹{total}</p>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Checkout'}
              </button>
            </div>

            {message && <p className="text-center text-red-500 mt-2">{message}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
