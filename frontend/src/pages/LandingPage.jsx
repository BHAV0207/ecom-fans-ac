import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import LandingHeader from "../components/LandingHeader";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <LandingHeader />

      {/* Hero Section */}
      <main className="pt-16">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Find The Best
              <span className="block text-indigo-600">Ac Or Coolers</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Discover the best air conditioners and coolers tailored to your
              needs. Join our community of satisfied customers and enjoy
              exclusive offers.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
              <div>
                <div className="text-4xl font-extrabold text-indigo-600">
                  100+
                </div>
                <div className="mt-2 text-lg text-gray-600">Brands</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-indigo-600">
                  1500+
                </div>
                <div className="mt-2 text-lg text-gray-600">
                  Options To Look From
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-indigo-600">
                  98% Happy Customers
                </div>
                <div className="mt-2 text-lg text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} WorkFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
