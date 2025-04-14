import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both size and color.");
      return;
    }
    const cartItem = {
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1,
    };

    // Save to localStorage (or a cart context)
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Product added to cart!");
  };

  if (!product) {
    return <div className="p-8">Loading product details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg text-green-700 font-semibold mb-4">₹{product.price}</p>

      {product.colors?.length > 0 && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Choose Color:</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Select --</option>
            {product.colors.map((color, i) => (
              <option key={i} value={color}>{color}</option>
            ))}
          </select>
        </div>
      )}

      {product.sizes?.length > 0 && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Choose Size:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Select --</option>
            {product.sizes.map((size, i) => (
              <option key={i} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
