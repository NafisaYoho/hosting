// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "../pages/Home";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Courses from "../pages/Courses";
import Student from "../pages/Student";
import HelpCenter from "../pages/HelpCenter";
import FAQ from "../pages/FAQ";
import Feedback from "../pages/Feedback";
import About from "../pages/About";
import Merchant from "../pages/merchant";
import Analytics from "../pages/Analytics";
import PaymentHistory from "../pages/PaymentHistory";
import Notification from "../pages/Notification";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Main pages */}
      <Route path="/home" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/student" element={<Student />} />
      <Route path="/helpcenter" element={<HelpCenter />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/about" element={<About />} />
      <Route path="/merchant" element={<Merchant />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/payment-history" element={<PaymentHistory />} />
      <Route path="/notification" element={<Notification />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
