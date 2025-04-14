import React, { useEffect, useContext } from "react";
import { LogicContext } from "../store/LogicStore";
import { Link } from "react-router-dom";

function ProductsUser() {
  const { allProducts, getProducts, productLoading, productError } =
    useContext(LogicContext);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Assuming getProducts is stable or memoized

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-center text-gray-900 mb-12">
          Our Products
        </h2>

        {productLoading && (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="ml-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {productError && (
          <div className="text-center">
            <p className="text-red-600 bg-red-100 p-4 rounded-md">
              {productError}
            </p>
          </div>
        )}

        {!productLoading && !productError && allProducts.length === 0 && (
          <div className="text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}

        {!productLoading && !productError && allProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {allProducts.map((product) => (
              <Link
                key={product._id || product.id}
                to={`/products/${product._id || product.id}`}
                className="group block"
              >
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/300"} // Use placeholder
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 font-medium group-hover:text-indigo-600">
                      {product.name}
                    </h3>
                    {/* Optional: Display primary color or category */}
                    {/* <p className="mt-1 text-sm text-gray-500">{product.colors ? product.colors[0] : ''}</p> */}
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{product.price}
                  </p>
                </div>
                {/* Optional: Quick add/view details on hover (more complex) */}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsUser;
