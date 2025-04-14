import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // For redirecting after adding to cart
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(""); // For user feedback (e.g., added to cart)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`https://ecom-fans-ac.onrender.com/api/products/${id}`);
        if (res.data?.data) {
          setProduct(res.data.data);
          // Pre-select first option if available
          if (res.data.data.colors?.length > 0) {
            setSelectedColor(res.data.data.colors[0]);
          }
          if (res.data.data.sizes?.length > 0) {
            setSelectedSize(res.data.data.sizes[0]);
          }
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.colors?.length > 0 && !selectedColor) {
      setFeedback("Please select a color.");
      return;
    }
    if (product.sizes?.length > 0 && !selectedSize) {
      setFeedback("Please select a size.");
      return;
    }

    const cartItem = {
      ...product,
      id: product._id || product.id, // Ensure consistent ID
      selectedColor,
      selectedSize,
      quantity: 1,
    };

    // --- Add to Cart Logic ---
    // Replace this with your actual CartContext logic or API call
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      // Prevent adding duplicates with same options (optional)
      const itemExists = existingCart.find(
        (item) =>
          item.id === cartItem.id &&
          item.selectedColor === cartItem.selectedColor &&
          item.selectedSize === cartItem.selectedSize
      );
      if (!itemExists) {
        existingCart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setFeedback("Product added to cart!");
        // Optionally navigate to cart or show success longer
        setTimeout(() => setFeedback(""), 3000);
        // Example: navigate('/cart');
      } else {
        setFeedback("Item with these options already in cart.");
        setTimeout(() => setFeedback(""), 3000);
      }
      // OR: await addToCart(cartItem); // If using context method
    } catch (err) {
      console.error("Failed to add to cart:", err);
      setFeedback("Error adding item to cart.");
      setTimeout(() => setFeedback(""), 3000);
    }
    // --- End Add to Cart Logic ---
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
      </div>
    );
  }

  if (!product) {
    // Should ideally be handled by the error state, but as a fallback:
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="lg:col-start-1 lg:row-span-1">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.imageUrl || "https://via.placeholder.com/600"} // Use placeholder if no image
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 lg:col-start-2 lg:row-span-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">₹{product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div
              className="text-base text-gray-700 space-y-6"
              dangerouslySetInnerHTML={{ __html: product.description }} // Be cautious with dangerouslySetInnerHTML if description isn't sanitized
            />
          </div>

          <form className="mt-6">
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm text-gray-600 font-medium">Color</h3>
                <fieldset className="mt-2">
                  <legend className="sr-only">Choose a color</legend>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <label
                        key={color}
                        className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                          selectedColor === color
                            ? "ring-2 ring-offset-1 ring-indigo-500"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="color-choice"
                          value={color}
                          checked={selectedColor === color}
                          onChange={() => setSelectedColor(color)}
                          className="sr-only"
                          aria-labelledby={`color-choice-${color}-label`}
                        />
                        <span
                          id={`color-choice-${color}-label`}
                          className="sr-only"
                        >
                          {color}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-gray-300 border border-black border-opacity-10 rounded-full" // Simple placeholder - use actual colors if available
                          style={{ backgroundColor: color.toLowerCase() }} // Attempt to set background color
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-600 font-medium">Size</h3>
                </div>

                <fieldset className="mt-2">
                  <legend className="sr-only">Choose a size</legend>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
                    {product.sizes.map((size) => (
                      <label
                        key={size}
                        className={`cursor-pointer group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 ${
                          selectedSize === size
                            ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                            : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="size-choice"
                          value={size}
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(size)}
                          className="sr-only"
                          aria-labelledby={`size-choice-${size}-label`}
                        />
                        <span id={`size-choice-${size}-label`}>{size}</span>
                        <span
                          className={`absolute -inset-px rounded-md pointer-events-none ${
                            selectedSize === size
                              ? "border-2 border-indigo-500"
                              : "border border-transparent"
                          }`}
                          aria-hidden="true"
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* Feedback Area */}
            {feedback && (
              <p
                className={`mt-4 text-sm ${
                  feedback.includes("Error") ||
                  feedback.includes("Please select")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {feedback}
              </p>
            )}

            <div className="mt-10 flex">
              <button
                type="button" // Change to type="button" to prevent default form submission
                onClick={handleAddToCart}
                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full disabled:opacity-50"
                disabled={product.inventory <= 0} // Disable if out of stock
              >
                {product.inventory > 0 ? "Add to cart" : "Out of Stock"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
