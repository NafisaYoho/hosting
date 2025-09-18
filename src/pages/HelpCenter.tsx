import { useState } from "react";
import { motion } from "framer-motion";
import { X, Phone, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NumberCategory = "Student" | "Institute" | "Course" | "Payment" | "Common";

interface NumberEntry {
  id: number;
  category: NumberCategory;
  number: string;
}

export default function HelpCenter() {
  const navigate = useNavigate();

  const [numbers, setNumbers] = useState<NumberEntry[]>([
    { id: 1, category: "Student", number: "+91 9876543210" },
    { id: 2, category: "Institute", number: "+91 9123456780" },
    { id: 3, category: "Course", number: "+91 9988776655" },
    { id: 4, category: "Payment", number: "+91 9000012345" },
    { id: 5, category: "Common", number: "+91 8888888888" },
  ]);

  const [newCategory, setNewCategory] = useState<NumberCategory>("Student");
  const [newNumber, setNewNumber] = useState("");

  // ✅ Add new contact number
  const addNumber = () => {
    if (!newNumber.trim()) return;
    setNumbers([
      ...numbers,
      { id: Date.now(), category: newCategory, number: newNumber },
    ]);
    setNewNumber("");
  };

  // ✅ Delete number
  const deleteNumber = (id: number) => {
    setNumbers(numbers.filter((n) => n.id !== id));
  };

  return (
    <div className="p-6 pb-20 bg-black min-h-screen flex flex-col items-center">
      {/* Sticky Close Button */}
      <div className="w-full max-w-5xl sticky top-0 bg-black z-50 py-4 flex justify-end">
        <button
          onClick={() => navigate("/home")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <X size={16} /> Close
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-pink-500 text-center">
        Help Center – Contact Numbers
      </h2>

      {/* Add New Number */}
      <div className="flex flex-col md:flex-row gap-3 mb-8 w-full max-w-5xl">
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as NumberCategory)}
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:border-pink-500 transition"
        >
          <option value="Student">Student</option>
          <option value="Institute">Institute</option>
          <option value="Course">Course</option>
          <option value="Payment">Payment</option>
          <option value="Common">Common</option>
        </select>

        <input
          type="text"
          placeholder="Enter Number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded-lg flex-1 focus:outline-none focus:border-pink-500 transition"
        />

        <button
          onClick={addNumber}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
        >
          Add
        </button>
      </div>

      {/* Numbers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {numbers.map((item) => (
          <motion.div
            key={item.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col items-start gap-3 hover:border-pink-500 transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <Phone className="text-pink-500" size={20} />
              <h3 className="text-lg font-semibold text-white">
                {item.category} Support
              </h3>
            </div>
            <p className="text-gray-300 text-sm">{item.number}</p>

            {/* Delete Button */}
            <button
              onClick={() => deleteNumber(item.id)}
              className="self-end text-red-400 hover:text-red-600 mt-auto"
            >
              <Trash2 size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
