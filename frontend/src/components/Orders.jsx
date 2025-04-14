import React, { useEffect, useContext, useState } from "react";
import { LogicContext } from "../store/LogicStore";

function Orders() {
  const {
    getAllOrders,
    allOrders,
    productLoading,
    productError,
    assignRiderToOrder,
    getAllRiders,
    allRiders,
  } = useContext(LogicContext);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllOrders();
    getAllRiders();
  }, []);

  const openAssignModal = (orderId) => {
    setSelectedOrderId(orderId);
    setSelectedRiderId(""); // Reset dropdown
    setShowModal(true);
  };

  const handleAssign = async () => {
    if (!selectedRiderId || !selectedOrderId) return;
    await assignRiderToOrder(selectedOrderId, selectedRiderId);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">All Orders</h2>

        {productError && (
          <p className="text-red-600 mb-4">Error: {productError}</p>
        )}

        {productLoading ? (
          <p className="text-blue-600">Loading orders...</p>
        ) : allOrders.length === 0 ? (
          <p className="text-blue-800">No orders found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allOrders.map((order) => (
              <div
                key={order._id}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="mb-2">
                  <span className="text-blue-900 font-medium">Order ID:</span>{" "}
                  {order._id}
                </div>

                <div className="mb-2">
                  <span className="text-blue-900 font-medium">User:</span>{" "}
                  {order.user?.name || "User Info Missing"}
                </div>

                <div className="mb-2">
                  <span className="text-blue-900 font-medium">Address:</span>{" "}
                  {order.address}
                </div>

                <div className="mb-2">
                  <span className="text-blue-900 font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-blue-900 font-medium">
                    Assigned Rider:
                  </span>{" "}
                  {order.assignedRider?.name || "Not Assigned"}
                </div>

                <div className="mt-3">
                  <span className="text-blue-900 font-medium">Products:</span>
                  <ul className="list-disc pl-5 text-blue-800 text-sm">
                    {order.products.map((item, idx) => (
                      <li key={idx}>
                        {item.product?.name || "Product Name Missing"} -{" "}
                        {item.color}, {item.size} (Qty: {item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => openAssignModal(order._id)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Assign Rider
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Assign Rider
            </h3>

            <p className="mb-2 text-blue-800">
              Order ID: <span className="font-mono">{selectedOrderId}</span>
            </p>

            <label className="block text-blue-900 font-medium mb-2">
              Select Rider:
            </label>
            <select
              value={selectedRiderId}
              onChange={(e) => setSelectedRiderId(e.target.value)}
              className="w-full border border-blue-300 rounded px-3 py-2 mb-4"
            >
              <option value="">-- Choose a Rider --</option>
              {allRiders.map((rider) => (
                <option key={rider._id} value={rider._id}>
                  {rider.name} ({rider.email})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
