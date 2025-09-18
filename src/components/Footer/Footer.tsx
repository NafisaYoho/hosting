import React from "react";
import { motion } from "framer-motion";
import { FiHelpCircle, FiUser } from "react-icons/fi";
import {
  ChatBubbleLeftEllipsisIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  setRoute: React.Dispatch<
    React.SetStateAction<"HelpCenter" | "FAQ" | "About" | "Feedback">
  >;
  currentRoute: "HelpCenter" | "FAQ" | "About" | "Feedback";
}

export default function Footer({ setRoute, currentRoute }: FooterProps) {
  const navigate = useNavigate();

  const leftItems = [
    { key: "HelpCenter", label: "Help Center", icon: <FiUser size={20} />, path: "/helpcenter" },
    { key: "FAQ", label: "FAQ", icon: <FiHelpCircle size={20} />, path: "/faq" },
  ];

  const rightItems = [
    { key: "About", label: "About", icon: <InformationCircleIcon className="h-5 w-5" />, path: "/about" },
    { key: "Feedback", label: "Feedback", icon: <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />, path: "/feedback" },
  ];

  const renderItem = (item: typeof leftItems[0]) => {
    const isActive = currentRoute === item.key;

    return (
      <motion.div
        key={item.key}
        onClick={() => {
          setRoute(item.key as any);
          navigate(item.path);   // ✅ navigate to actual route
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition 
          ${
            isActive
              ? "bg-pink-600 text-white shadow-md"
              : "bg-black text-white hover:text-pink-600"
          }
        `}
        whileHover={{ scale: 1.05, y: -1 }}
        transition={{ duration: 0.2 }}
      >
        {item.icon}
        <span>{item.label}</span>
      </motion.div>
    );
  };

  return (
    <footer className="fixed bottom-0 w-full bg-black text-white py-2">
      <div className="w-full mx-auto px-6 flex justify-between items-center">
        <div className="flex gap-4">{leftItems.map(renderItem)}</div>
        <div className="flex gap-4">{rightItems.map(renderItem)}</div>
      </div>
    </footer>
  );
}
