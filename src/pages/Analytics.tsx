import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const enrollmentData = [
  { month: "Jan", enrollments: 40, placements: 24 },
  { month: "Feb", enrollments: 30, placements: 18 },
  { month: "Mar", enrollments: 60, placements: 40 },
  { month: "Apr", enrollments: 50, placements: 32 },
  { month: "May", enrollments: 70, placements: 50 },
  { month: "Jun", enrollments: 90, placements: 60 },
];

const pieData = [
  { name: "Approved Courses", value: 45 },
  { name: "Pending Courses", value: 15 },
  { name: "Rejected Courses", value: 10 },
];

const COLORS = ["#ec4899", "#ffffff", "#6b7280"]; // pink, white, gray

export default function Analytics() {
  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-6">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 📊 Enrollment vs Placement Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4"
        >
          <h2 className="font-semibold mb-2">Enrollments vs Placements</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Bar dataKey="enrollments" fill="#ec4899" radius={[6, 6, 0, 0]} />
              <Bar dataKey="placements" fill="#ffffff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 📈 Enrollment Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4"
        >
          <h2 className="font-semibold mb-2">Enrollment Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="enrollments" stroke="#ec4899" strokeWidth={2} />
              <Line type="monotone" dataKey="placements" stroke="#ffffff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 🥧 Course Approval Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border h-[400px] border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4 col-span-1 lg:col-span-2"
        >
          <h2 className="font-semibold mb-2">Course Approvals</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
