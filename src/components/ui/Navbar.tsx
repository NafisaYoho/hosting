import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  ClockIcon,
  BookOpenIcon,
  UserCircleIcon,
 
  Squares2X2Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

interface AdminNavbarProps {
  route:
    | "home"
    | "profile"
    | "settings"
    | "courses"
    | "student"
    | "merchant"
    | "paymentHistory"
    | "analytics";
  setRoute: React.Dispatch<
    React.SetStateAction<
      | "home"
      | "profile"
      | "settings"
      | "courses"
      | "student"
      | "merchant"
      | "analytics"
      | "paymentHistory"
    >
  >;
}

export default function AdminNavbar({ route, setRoute }: AdminNavbarProps) {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount] = useState(10);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [notifications] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      title: `Notification ${i + 1}`,
      time: `${i + 1} min ago`,
    }))
  );


const menuItems = [
  { icon: <Squares2X2Icon className="w-7 h-7" />, key: "home", label: "Dashboard", path: "/Home" },
  { icon: <BuildingLibraryIcon className="w-7 h-7" />, key: "merchant", label: "Merchant Management", path: "/merchant" },
  { icon: <AcademicCapIcon className="w-7 h-7" />, key: "student", label: "Student Management", path: "/student" },
  { icon: <BookOpenIcon className="w-7 h-7" />, key: "courses", label: "Courses", path: "/courses" },
  { icon: <ChartBarIcon className="w-7 h-7" />, key: "analytics", label: "Analytics & Reports", path: "/analytics" },
  { icon: <ClockIcon className="w-7 h-7" />, key: "paymentHistory", label: "Payment History", path: "/payment-history" },
];


  const handleLogout = () => {
    alert("Logout successful!");
    navigate("/signin");
  };
  
  const handleProfile = () => {
    setRoute("profile");
    navigate("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 w-full bg-black py-2 z-50"
    >
      <div className="w-full mx-auto px-5 flex items-center justify-between h-14">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-3 min-w-[120px]"
        >
          <img
            src="https://logodix.com/logo/1098296.jpg"
            alt="Logo"
            className="w-25 h-12 object-contain"
          />
          <h1 className="text-lg font-bold text-white hidden md:block">IMS-Admin</h1>
        </motion.div>

        {/* Center Navigation */}
        <div className="flex-1 flex justify-center mx-4 relative">
          <AnimatePresence mode="wait">
            {showSearch ? (
              <motion.div
                key="search-bar"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center max-w-md w-full mx-auto"
              >
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search across the platform..."
                    className="w-full bg-black placeholder-white text-white px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    autoFocus
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-pink-500"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="nav-icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex gap-6 rounded-full px-4 py-2 shadow-md"
              >
                {menuItems.map((item, index) => {
  const isActive = route === item.key;
  const isHovered = hoveredItem === item.key;
  return (
    <motion.button
      key={item.key}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHoveredItem(item.key)}
      onHoverEnd={() => setHoveredItem(null)}
      onClick={() => {
        setRoute(item.key as any);
        navigate(item.path);   // ✅ no switch-case
      }}
      className="relative flex flex-col items-center p-1 transition-all duration-300 group"
    >
      <motion.div
        className={`rounded-lg flex items-center justify-center w-[40px] h-[40px] ${
          isActive
            ? "bg-pink-600 text-white shadow-md"
            : "bg-black text-white hover:text-pink-600"
        }`}
        animate={{
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {item.icon}
      </motion.div>
      <motion.div
        className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center text-white text-xs py-1 px-2 rounded"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="font-semibold text-white">{item.label}</div>
      </motion.div>
    </motion.button>
  );
})}

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className="flex gap-4 items-center min-w-[120px] justify-end relative">
          {!showSearch && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearch(true)}
              className="flex items-center justify-center w-10 h-10 rounded-xl"
            >
              <MagnifyingGlassIcon className="w-7 h-7 text-white hover:text-pink-600" />
            </motion.button>
          )}

         {/* Notification */}
<div
  className="relative"
  onMouseEnter={() => setShowNotifications(true)}
  onMouseLeave={() => setShowNotifications(false)}
>
  <motion.div className="relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer">
    {/* Bell Icon */}
    <BellIcon
      className="w-7 h-7 text-white hover:text-pink-600"
      onClick={() => navigate("/notification")}  // 👈 click bell → go page
    />

    {/* Count Badge */}
    {notificationCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow-md animate-pulse">
        {notificationCount}
      </span>
    )}

    {/* Dropdown */}
    <AnimatePresence>
      {showNotifications && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-12 w-72 max-h-96 overflow-y-auto border rounded-xl py-1 z-50 backdrop-blur-md bg-black/80"
        >
          {notifications.length === 0 ? (
            <p className="text-pink-600 text-sm text-center py-4">
              No notifications
            </p>
          ) : (
            <>
              {notifications.slice(0, 3).map((n, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-4 py-3 mb-1 rounded-lg hover:bg-gray-800/30 transition flex flex-col"
                  onClick={() => navigate("/Notification")}  // 👈 dropdown item → go page
                >
                  <span className="font-semibold text-pink-600">{n.title}</span>
                  <span className="text-xs text-gray-300">{n.time}</span>
                </button>
              ))}

              {/* View All Notifications Button */}
              <button
                className="w-full text-center text-sm text-pink-500 py-2 hover:bg-gray-800/30 transition"
                onClick={() => navigate("/notification")}
              >
                View all notifications →
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
</div>
{/* Profile */}
<div
  ref={dropdownRef}
  className="relative"
  onMouseEnter={() => setIsProfileDropdownOpen(true)}
  onMouseLeave={() => setIsProfileDropdownOpen(false)}
>
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-2 pl-2 pr-2 py-1 rounded-lg cursor-pointer hover:bg-pink-600"
  >
    <div className="hidden md:flex flex-col items-end">
      <span className="text-xs font-medium text-white">Admin User</span>
      <span className="text-[10px] text-white">Administrator</span>
    </div>
    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">
      A
    </div>
  </motion.div>

  <AnimatePresence>
    {isProfileDropdownOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl py-2 z-50"
      >
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-800">Admin User</p>
          <p className="text-xs text-gray-500 truncate">admin@example.com</p>
        </div>
        <div className="py-1">
          <button
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 flex items-center hover:text-pink-600"
            onClick={handleProfile}
          >
            <UserCircleIcon className="w-6 h-6 mr-3" /> Profile
          </button>
         
        </div>
        <div className="py-1 border-t border-gray-200">
          <button
            className="w-full text-left px-4 py-2.5 text-sm text-pink-600 flex items-center"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

        </div>
      </div>
    </motion.nav>
  );
}
