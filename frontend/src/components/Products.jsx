import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogicContext } from "../store/LogicStore";

function Products() {
  const { productLoading, productError, allProducts, getProducts } =
    useContext(LogicContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-900">All Products</h2>
        <button
          onClick={() => navigate("/admin/create-product")}
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
        >
          + Create Product
        </button>
      </div>

      {/* Loading/Error States */}
      {productLoading && <p className="text-blue-700">Loading products...</p>}
      {productError && (
        <p className="text-red-500 font-medium">{productError}</p>
      )}
      {!productLoading && !productError && allProducts.length === 0 && (
        <p className="text-blue-700">No products found.</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts?.map((product) => (
          <div
            key={product._id}
            className="border border-blue-100 bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-900">
              {product.name}
            </h3>
            <p className="text-sm text-blue-700 mt-1">{product.description}</p>
            <p className="mt-3 font-semibold text-blue-800">₹{product.price}</p>
            <p className="text-sm text-blue-700">
              Inventory: {product.inventory}
            </p>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Colors:{" "}
                {product.colors.length > 0 ? product.colors.join(", ") : "N/A"}
              </p>
              <p>
                Sizes:{" "}
                {product.sizes.length > 0 ? product.sizes.join(", ") : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
