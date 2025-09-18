import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Courses from "../pages/Courses";
import Student from "../pages/Student";
import HelpCenter from "../pages/HelpCenter";
import FAQ from "../pages/FAQ";
import Feedback from "../pages/Feedback";
import About from "../pages/About";
import InstitutePage from "../pages/merchant";
import Analytics from "../pages/Analytics";
import PaymentHistory from "../pages/PaymentHistory";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/student" element={<Student />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/about" element={<About />} />
      <Route path="/Merchant" element={<InstitutePage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/payment-history" element={<PaymentHistory />} />
      {/* fallback route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
