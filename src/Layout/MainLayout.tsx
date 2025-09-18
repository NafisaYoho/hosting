import React from "react";
import { FiHelpCircle } from "react-icons/fi";

interface FooterProps {
  setRoute: React.Dispatch<
    React.SetStateAction<"home" | "profile" | "settings" | "helpcenter">
  >;
}

export default function Footer({ setRoute }: FooterProps) {
  return (
    <footer className="fixed bottom-0 w-full bg-white text-gray-800 py-4 border-t border-gray-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">© 2025 Admin Panel</div>

        <div className="flex gap-6 items-center">
          <button
            onClick={() => setRoute("helpcenter")}
            className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors duration-300"
          >
            <FiHelpCircle size={20} />
            <span className="font-medium">Help Center</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
