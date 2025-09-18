import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Bell } from "lucide-react";

interface Course {
  id: string;
  name: string;
  institute: string;
  branch: string;
  fee: number;
  duration: string;
  status: "Pending Approval" | "Approved" | "Rejected";
}

const coursesData: Course[] = [
  {
    id: "C001",
    name: "B.Tech CSE",
    institute: "ABC Institute",
    branch: "Chennai",
    fee: 12000,
    duration: "4 Years",
    status: "Pending Approval",
  },
  {
    id: "C002",
    name: "MBA",
    institute: "XYZ Institute",
    branch: "Mumbai",
    fee: 15000,
    duration: "2 Years",
    status: "Approved",
  },
];

interface TabButtonProps {
  value: string;
  active: boolean;
  onClick: (value: string) => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ value, active, onClick, children }) => (
  <button
    onClick={() => onClick(value)}
    className={`px-4 py-2 rounded-xl text-sm font-medium ${
      active ? "bg-pink-600 text-white" : "bg-gray-800/60 text-gray-300 hover:bg-gray-800/80"
    }`}
  >
    {children}
  </button>
);

export default function Courses() {
  const [tab, setTab] = useState("pending");
  const [query, setQuery] = useState("");

  const filteredCourses = useMemo(
    () =>
      coursesData.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.institute.toLowerCase().includes(query.toLowerCase()) ||
          c.branch.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-6">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-600">Course Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              className="pl-9 pr-3 py-2 border border-gray-700 rounded-xl text-sm bg-gray-900/70 text-white placeholder-gray-400 backdrop-blur-md focus:ring-pink-600 focus:border-pink-600"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
         
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <TabButton value="pending" active={tab === "pending"} onClick={setTab}>
          Pending Approval
        </TabButton>
        <TabButton value="approved" active={tab === "approved"} onClick={setTab}>
          Approved Courses
        </TabButton>
        <TabButton value="rejected" active={tab === "rejected"} onClick={setTab}>
          Rejected Courses
        </TabButton>
      </div>

      <div className="space-y-6">
        {tab === "pending" &&
          filteredCourses
            .filter((c) => c.status === "Pending Approval")
            .map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-pink-600">{c.name}</h2>
                  <p>Institute: {c.institute}</p>
                  <p>Branch: {c.branch}</p>
                  <p>Fee: {c.fee}</p>
                  <p>Duration: {c.duration}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-pink-600 px-3 py-1 rounded-xl">Approve</button>
                  <button className="bg-gray-700 px-3 py-1 rounded-xl">Reject</button>
                </div>
              </motion.div>
            ))}

        {tab === "approved" &&
          filteredCourses
            .filter((c) => c.status === "Approved")
            .map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4"
              >
                <h2 className="font-semibold text-pink-600">{c.name}</h2>
                <p>Institute: {c.institute}</p>
                <p>Branch: {c.branch}</p>
                <p>Fee: {c.fee}</p>
                <p>Duration: {c.duration}</p>
              </motion.div>
            ))}

        {tab === "rejected" &&
          filteredCourses
            .filter((c) => c.status === "Rejected")
            .map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4"
              >
                <h2 className="font-semibold text-pink-600">{c.name}</h2>
                <p>Institute: {c.institute}</p>
                <p>Branch: {c.branch}</p>
                <p>Fee: {c.fee}</p>
                <p>Duration: {c.duration}</p>
              </motion.div>
            ))}
      </div>
    </div>
  );
}
