  import React from "react";
  import { Briefcase } from "lucide-react";

  function LandingHeader() {
    return (
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-lg z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-semibold text-gray-900">
                CoolWind
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://ecom-fans-ac.onrender.com/api/auth/google"
                className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 focus:outline-none transition-all duration-200"
              >
                Login
              </a>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  export default LandingHeader;
