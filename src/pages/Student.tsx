import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface Student {
  id: string;
  name: string;
  institute: string;
  branch: string;
  course: string;
  status: "Pending Approval" | "Approved" | "Rejected";
  attendance: number;
  duration: string;
  fee: number;
  merchantShare: number;
  adminShare: number;
}

const studentsData: Student[] = [
  {
    id: "S001",
    name: "Aarav",
    institute: "ABC Institute",
    branch: "Chennai",
    course: "B.Tech CSE",
    status: "Pending Approval",
    attendance: 80,
    duration: "4 Years",
    fee: 12000,
    merchantShare: 1200,
    adminShare: 600,
  },
  {
    id: "S002",
    name: "Diya",
    institute: "XYZ Institute",
    branch: "Mumbai",
    course: "MBA",
    status: "Approved",
    attendance: 95,
    duration: "2 Years",
    fee: 15000,
    merchantShare: 1500,
    adminShare: 750,
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

export default function Student() {
  const [tab, setTab] = useState("newEnrollment");
  const [query, setQuery] = useState("");

  const filteredStudents = useMemo(
    () =>
      studentsData.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.course.toLowerCase().includes(query.toLowerCase()) ||
          s.branch.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-6">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-600">Student Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              className="pl-9 pr-3 py-2 border border-gray-700 rounded-xl text-sm bg-gray-900/70 text-white placeholder-gray-400 backdrop-blur-md focus:ring-pink-600 focus:border-pink-600"
              placeholder="Search students..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
         
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <TabButton value="newEnrollment" active={tab === "newEnrollment"} onClick={setTab}>
          New Enrollment
        </TabButton>
        <TabButton value="enrollmentList" active={tab === "enrollmentList"} onClick={setTab}>
          Enrollment List
        </TabButton>
        <TabButton value="progress" active={tab === "progress"} onClick={setTab}>
          Progress Tracking
        </TabButton>
        <TabButton value="payments" active={tab === "payments"} onClick={setTab}>
          Payment & Share
        </TabButton>
        <TabButton value="reports" active={tab === "reports"} onClick={setTab}>
          Reports
        </TabButton>
      </div>

      <div className="space-y-6">
        {/* New Enrollment */}
        {tab === "newEnrollment" && (
          <div className="space-y-4">
            {filteredStudents
              .filter((s) => s.status === "Pending Approval")
              .map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4 flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-semibold text-pink-600">{s.name}</h2>
                    <p>Course: {s.course}</p>
                    <p>Institute: {s.institute}</p>
                    <p>Branch: {s.branch}</p>
                    <p>Fee: {s.fee}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-pink-600 px-3 py-1 rounded-xl">Approve</button>
                    <button className="bg-gray-700 px-3 py-1 rounded-xl">Reject</button>
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        {/* Enrollment List */}
        {tab === "enrollmentList" && (
          <div className="overflow-x-auto border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-800/80 text-gray-300">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Course</th>
                  <th className="p-2 text-left">Branch</th>
                  <th className="p-2 text-left">Institute</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                    <td className="p-2">{s.id}</td>
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.course}</td>
                    <td className="p-2">{s.branch}</td>
                    <td className="p-2">{s.institute}</td>
                    <td className="p-2">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Progress Tracking */}
        {tab === "progress" && (
          <div className="space-y-4">
            {filteredStudents.map((s) => (
              <div
                key={s.id}
                className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4"
              >
                <h2 className="font-semibold text-pink-600">{s.name}</h2>
                <p>Attendance: {s.attendance}%</p>
                <p>Course Duration: {s.duration}</p>
                <div className="w-full bg-gray-800 rounded-full h-3 mt-1">
                  <div
                    className="bg-pink-600 h-3 rounded-full"
                    style={{ width: `${s.attendance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment & Share */}
        {tab === "payments" && (
          <div className="space-y-4">
            {filteredStudents.map((s) => (
              <div
                key={s.id}
                className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4"
              >
                <h2 className="font-semibold text-pink-600">{s.name}</h2>
                <p>Fee Paid: {s.fee}</p>
                <p>Merchant Share: {s.merchantShare}</p>
                <p>Admin Share: {s.adminShare}</p>
              </div>
            ))}
          </div>
        )}

        {/* Reports */}
        {tab === "reports" && (
          <div className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4">
            <h2 className="font-semibold text-pink-600">Reports (Summary)</h2>
            <p>Total Students: {studentsData.length}</p>
            <p>
              Pending Approvals:{" "}
              {studentsData.filter((s) => s.status === "Pending Approval").length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
