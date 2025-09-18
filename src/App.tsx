import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "./components/ui/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Dashboard from "./pages/Home";
import Merchant from "./pages/merchant";
import Student from "./pages/Student";
import Courses from "./pages/Courses";
import Analytics from "./pages/Analytics";
import PaymentHistory from "./pages/PaymentHistory";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import AdminAboutUs from "./pages/About";
import Feedback from "./pages/Feedback";
import FAQ from "./pages/FAQ";
import Notification from "./pages/Notification";

export default function App() {
  const [route, setRoute] = useState<
    | "home"
    | "profile"
    | "settings"
    | "courses"
    | "student"
    | "merchant"
    | "analytics"
    | "paymentHistory"
    | "HelpCenter"
    | "FAQ"
    | "About"
    | "Feedback"
  >("home");

  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <AdminNavbar route={route} setRoute={setRoute} />

      <div className="pt-20 px-6">
        <Routes>
          {/* 👇 Default route */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/student" element={<Student />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Admin" element={<Settings />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/About" element={<AdminAboutUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </div>

      {/* Footer always visible */}
      <Footer setRoute={setRoute} currentRoute={route} />
    </BrowserRouter>
  );
}
