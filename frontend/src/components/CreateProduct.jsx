import React, { useState, useContext } from "react";
import { LogicContext } from "../store/LogicStore";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const { createProduct, productLoading } = useContext(LogicContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    colors: "",
    sizes: "",
    inventory: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      inventory: parseInt(formData.inventory),
      colors: formData.colors.split(",").map((color) => color.trim()),
      sizes: formData.sizes.split(",").map((size) => size.trim()),
    };

    try {
      const created = await createProduct(newProduct);
      if (created) {
        navigate("/admin/products");
      }
    } catch (err) {
      setError("Failed to create product.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto bg-blue-50 p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Create New Product
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-blue-900 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-blue-900 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-900 font-medium">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-medium">Inventory</label>
              <input
                type="number"
                name="inventory"
                value={formData.inventory}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-medium">Colors (comma separated)</label>
            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-blue-900 font-medium">Sizes (comma separated)</label>
            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={productLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
          >
            {productLoading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
