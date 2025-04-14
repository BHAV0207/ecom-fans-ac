import React, { useState, useContext } from "react";
import { LogicContext } from "../store/LogicStore";
import { useNavigate } from "react-router-dom";

function CreateRider() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });

  const { createRider, productLoading, productError } = useContext(LogicContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const riderPayload = {
      ...formData,
      role: "rider",
    };

    const created = await createRider(riderPayload);

    if (created) {
      navigate("/admin/rider");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Create New Rider</h2>

        {productError && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
            {productError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-blue-800 font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter rider's name"
            />
          </div>

          <div>
            <label className="block text-blue-800 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter rider's email"
            />
          </div>

          <div>
            <label className="block text-blue-800 font-medium">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-blue-800 font-medium">Photo URL</label>
            <input
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Paste rider's photo URL"
            />
          </div>

          <button
            type="submit"
            disabled={productLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {productLoading ? "Creating..." : "Create Rider"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRider;
