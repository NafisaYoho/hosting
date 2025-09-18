
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-800">🔔 Notifications</h2>
        <p className="text-gray-600 mt-3">
          You don’t have any new notifications right now.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/home")}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Go to Home
        </button>

        {/* Example: Go to Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="mt-3 ml-3 bg-gray-600 text-white px-5 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
}
