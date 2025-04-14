import React from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, userInfo }) => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-blue-100 z-30 sticky top-0 bg-white text-blue-900">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sidebar Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-blue-500 hover:bg-blue-100 transition"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* User Info */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/admin/profile")}
          >
            <img
              className="h-8 w-8 rounded-full border border-blue-100"
              src={userInfo.avatar}
              alt={userInfo.name}
            />
            <div className="hidden md:flex ml-2 flex-col">
              <span className="text-sm font-medium text-blue-900">
                {userInfo.name}
              </span>
              <span className="text-xs text-blue-500">{userInfo.role}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
