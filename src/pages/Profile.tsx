import React, { useState } from "react";

const Profile: React.FC = () => {
  // Initial user data
  const initialUser = {
    name: "Nafisa",
    role: "Admin", // Admin | Student | Institute
    email: "nafisa@example.com",
    phone: "+91 98765 43210",
    institute: "ABC Institute",
    branch: "Chennai",
    avatar: "https://i.pravatar.cc/150?img=32",
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
    console.log("Updated user:", user);
  };

  return (
    <div className="bg-transparent px-6 py-10 flex justify-center">
      <div className="w-full max-w-2xl bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-lg p-8 text-white">
        {/* Header */}
        <div className="flex items-center gap-6 border-b border-gray-700 pb-6">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-pink-600"
          />
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="text-2xl font-bold text-pink-500 bg-gray-800/50 px-2 py-1 rounded focus:outline-none w-full"
              />
            ) : (
              <h1 className="text-2xl font-bold text-pink-500">{user.name}</h1>
            )}
            <p className="text-gray-300">{user.role}</p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-400">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="bg-gray-800/50 px-3 py-2 rounded focus:outline-none"
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="bg-gray-800/50 px-3 py-2 rounded focus:outline-none"
                />
              ) : (
                <p>{user.phone}</p>
              )}
            </div>

            {user.role !== "Student" && (
              <>
                <div className="flex flex-col">
                  <label className="text-gray-400">Institute</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="institute"
                      value={user.institute}
                      onChange={handleChange}
                      className="bg-gray-800/50 px-3 py-2 rounded focus:outline-none"
                    />
                  ) : (
                    <p>{user.institute}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-400">Branch</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="branch"
                      value={user.branch}
                      onChange={handleChange}
                      className="bg-gray-800/50 px-3 py-2 rounded focus:outline-none"
                    />
                  ) : (
                    <p>{user.branch}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
