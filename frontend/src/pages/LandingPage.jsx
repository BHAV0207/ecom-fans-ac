import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LandingHeader from "../components/LandingHeader";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <LandingHeader />

      {/* Hero Section */}
      <main className="pt-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Find The Best
            <span className="block text-indigo-200">ACs and Coolers</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            Discover top-rated air conditioners and coolers tailored to your
            needs. Join our community of happy customers and unlock exclusive
            offers.
          </p>
          <div className="mt-12">
            <a
              href="https://ecom-fans-ac.onrender.com/api/auth/google"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-indigo-600 bg-white hover:bg-indigo-100 rounded-full shadow-lg transition-all"
            >
              Get Started
              <ArrowRight className="ml-3 h-6 w-6 text-indigo-600" />
            </a>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-indigo-600">
            Why Choose Us?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3">
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600">100+</div>
              <div className="mt-4 text-lg text-gray-600">Top Brands</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600">1500+</div>
              <div className="mt-4 text-lg text-gray-600">
                Options to Choose From
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600">98%</div>
              <div className="mt-4 text-lg text-gray-600">
                Customer Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-600 py-12">
        <div className="max-w-7xl mx-auto text-center text-white">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} <strong>WorkFlow</strong>. All
            rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Your go-to platform for top-rated ACs and Coolers.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
