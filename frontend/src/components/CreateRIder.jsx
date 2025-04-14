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

  const { createRider, productLoading, productError } =
    useContext(LogicContext);
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
      // Optional: Add a success message/toast notification here
      navigate("/admin/rider");
    }
  };

  return (
    // Use a slightly off-white background for the page
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
              Register New Rider
            </h2>
            <p className="text-gray-500 mt-1">
              Enter the details for the new rider account.
            </p>
          </div>

          {/* Error Message Area */}
          {productError && (
            <div
              className="bg-red-50 border border-red-200 text-sm text-red-700 px-4 py-3 rounded-md mb-6"
              role="alert"
            >
              <strong className="font-medium">Error:</strong> {productError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel" // Use type="tel" for phone numbers
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Photo URL Input */}
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo URL (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="photo"
                  name="photo"
                  type="url" // Use type="url" for better semantics/validation
                  value={formData.photo}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="https://example.com/photo.jpg"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Provide a direct link to the rider's profile picture.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={productLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"
              >
                {productLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {productLoading
                  ? "Creating Account..."
                  : "Create Rider Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRider;
