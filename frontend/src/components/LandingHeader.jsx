import React from "react";
import { Briefcase } from "lucide-react";

function LandingHeader() {

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              CoolWind
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="http://localhost:5000/api/auth/google"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150 ease-in-out"
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
