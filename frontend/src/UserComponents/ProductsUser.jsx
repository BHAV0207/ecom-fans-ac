import React, { useEffect, useContext } from "react";
import { LogicContext } from "../store/LogicStore";
import { Link } from "react-router-dom";

function ProductsUser() {
  const { allProducts, getProducts, productLoading, productError } =
    useContext(LogicContext);

  useEffect(() => {
    getProducts();
  }, []);

  if (productLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">{productError}</p>
      </div>
    );
  }

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allProducts.map((product) => (
        <Link
        to={`/user/product/${product._id}`}
        key={product._id}
        className="block hover:shadow-lg transition-shadow"
      >
      
          <div className="bg-white shadow-md rounded-lg p-6 hover:border-blue-400 border-2 border-transparent">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg text-green-700 font-bold mb-2">
              ₹{product.price}
            </p>

            {product.colors?.length > 0 && (
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Colors:</span>{" "}
                {product.colors.join(", ")}
              </p>
            )}

            {product.sizes?.length > 0 && (
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-medium">Sizes:</span>{" "}
                {product.sizes.join(", ")}
              </p>
            )}

            <p className="text-sm text-gray-500 mb-4">
              In Stock: {product.inventory}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductsUser;
