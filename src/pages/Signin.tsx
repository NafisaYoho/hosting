import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const SignInPage: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleSignIn = () => {
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  const bgColor = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";
  const inputBg = theme === "dark" ? "bg-gray-800/70 border-gray-700 text-white placeholder-gray-300" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500";
  const btnBg = theme === "dark" ? "bg-pink-600 hover:bg-pink-500 text-white" : "bg-pink-500 hover:bg-pink-400 text-white";

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} transition-colors duration-300`}>
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pink-500">Sign In</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-lg border border-gray-600 hover:bg-gray-700/30 transition"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-pink-500 focus:border-pink-500 ${inputBg}`}
            />
          </div>

          <div className="relative">
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-pink-500 focus:border-pink-500 ${inputBg}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={handleSignIn}
            className={`w-full px-6 py-2 mt-2 rounded-lg font-semibold transition ${btnBg}`}
          >
            Sign In
          </button>

          <p className="text-xs text-gray-400 text-center mt-2">
            Don't have an account? <span className="text-pink-500 cursor-pointer hover:underline">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
