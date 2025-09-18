import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Student" | "Institute";
  active: boolean;
}

const Settings: React.FC = () => {
  // Theme & Colors
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [primaryColor, setPrimaryColor] = useState<"pink" | "blue" | "gray">("pink");

  // Notifications
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);

  // System Preferences
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [language, setLanguage] = useState("English");

  // Security
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // User Management
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Nafisa", email: "nafisa@example.com", role: "Admin", active: true },
    { id: 2, name: "John", email: "john@example.com", role: "Student", active: true },
    { id: 3, name: "Institute A", email: "instA@example.com", role: "Institute", active: false },
  ]);

  const handleToggleUser = (id: number) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  const handleChangePassword = () => {
    alert("Password changed successfully!");
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
    console.log({
      theme,
      primaryColor,
      notificationsEnabled,
      emailNotificationsEnabled,
      timezone,
      dateFormat,
      language,
      twoFAEnabled,
      users,
    });
  };

  return (
    <div className="bg-transparent min-h-screen flex justify-center py-10 px-4 text-white">
      <div className="w-full max-w-4xl bg-black/40 backdrop-blur-md rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">Settings</h1>

        {/* Dashboard Theme & Colors */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-pink-500">Dashboard Theme & Colors</h2>
          <div className="flex gap-4">
            <select
              value={theme}
              onChange={e => setTheme(e.target.value as "dark" | "light")}
              className="flex-1 px-3 py-2 rounded bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              <option value="dark">Dark Mode</option>
              <option value="light">Light Mode</option>
            </select>

            <select
              value={primaryColor}
              onChange={e => setPrimaryColor(e.target.value as "pink" | "blue" | "gray")}
              className="flex-1 px-3 py-2 rounded bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
              <option value="gray">Gray</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-pink-500">Notifications</h2>
          <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
            <p>Enable Notifications</p>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(prev => !prev)}
              className="h-5 w-5 text-pink-600 rounded"
            />
          </div>
          <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
            <p>Email Notifications</p>
            <input
              type="checkbox"
              checked={emailNotificationsEnabled}
              onChange={() => setEmailNotificationsEnabled(prev => !prev)}
              className="h-5 w-5 text-pink-600 rounded"
            />
          </div>
        </div>

        {/* User Management */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-pink-500">User Management</h2>
          {users.map(user => (
            <div
              key={user.id}
              className="flex justify-between items-center bg-gray-800/50 p-3 rounded"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-300 text-sm">{user.email} | {user.role}</p>
              </div>
              <button
                onClick={() => handleToggleUser(user.id)}
                className={`px-3 py-1 rounded ${
                  user.active ? "bg-pink-600 hover:bg-pink-500" : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {user.active ? "Active" : "Inactive"}
              </button>
            </div>
          ))}
        </div>

        {/* System Preferences */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-pink-500">System Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
            </select>

            <select
              value={dateFormat}
              onChange={e => setDateFormat(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            </select>

            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>
        </div>

        {/* Security / Access */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-pink-500">Security / Access</h2>
          <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
            <p>Enable 2FA (Two-Factor Authentication)</p>
            <input
              type="checkbox"
              checked={twoFAEnabled}
              onChange={() => setTwoFAEnabled(prev => !prev)}
              className="h-5 w-5 text-pink-600 rounded"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="w-full bg-pink-600 hover:bg-pink-500 py-2 rounded-lg font-semibold"
          >
            Change Password
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-pink-600 hover:bg-pink-500 py-2 rounded-lg font-semibold"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
