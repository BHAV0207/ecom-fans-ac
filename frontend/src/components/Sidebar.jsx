import React from "react";
import {
  Home,
  Briefcase,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full transition-all duration-300 z-30
        ${isOpen ? "w-64" : "w-16"} 
        ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }
        bg-white border-r border-blue-100 text-blue-900
      `}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4 bg-blue-50 border-b border-blue-100">
        {isOpen && (
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-blue-500" />
            <span className="ml-2 font-bold text-xl">AdminPro</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-5 px-2 space-y-1">
        <NavSection title="MAIN" isOpen={isOpen}>
          <NavItem
            icon={<Home size={20} />}
            text="Products"
            route="/admin/Products"
            isOpen={isOpen}
          />
          <NavItem
            icon={<Briefcase size={20} />}
            text="Create Product"
            route="/admin/create-product"
            isOpen={isOpen}
          />
          <NavItem
            icon={<Users size={20} />}
            text="Orders"
            route="/admin/orders"
            isOpen={isOpen}
          />
          <NavItem
            icon={<Briefcase size={20} />}
            text="Rider"
            route="/admin/rider"
            isOpen={isOpen}
          />
            <NavItem
            icon={<Briefcase size={20} />}
            text="Create Rider"
            route="/admin/rider-create"
            isOpen={isOpen}
          />
        </NavSection>

        <NavSection title="SETTINGS" isOpen={isOpen}>
          <NavItem
            icon={<Users size={20} />}
            text="Profile"
            route="/admin/profile"
            isOpen={isOpen}
          />
          <NavItem
            icon={<LogOut size={20} />}
            text="Logout"
            route="/"
            isOpen={isOpen}
          />
        </NavSection>
      </nav>
    </aside>
  );
};

const NavSection = ({ title, isOpen, children }) => {
  if (!isOpen) return <>{children}</>;

  return (
    <div className="space-y-1">
      <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-blue-400">
        {title}
      </h3>
      {children}
    </div>
  );
};

const NavItem = ({ icon, text, route, isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === route;

  const handleLogout = () => {
    localStorage.clear();
    navigate(route);
  };

  return (
    <button
      onClick={text === "Logout" ? handleLogout : () => navigate(route)}
      className={`
        w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
        ${isActive ? "bg-blue-100 text-blue-900" : "hover:bg-blue-50"}
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {isOpen && <span className="ml-3">{text}</span>}
    </button>
  );
};

export default Sidebar;
