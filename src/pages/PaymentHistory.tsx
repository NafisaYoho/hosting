import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  BuildingOffice2Icon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/solid";

type Status = "Payment Pending" | "Accepted" | "Rejected";

interface StudentEnrollment {
  id: string;
  studentName: string;
  courseName: string;
  duration: string;
  fee: number;
  status: Status;
}

interface Institute {
  id: string;
  name: string;
  branch: string;
  minFee: number;
  status: Status;
}

interface Transaction {
  id: string;
  student: string;
  institute: string;
  fee: number;
  date: string;
  receipt: string;
}

function formatCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function generateReceipt(tx: Transaction) {
  return [
    "===== RECEIPT =====",
    `Receipt ID: ${tx.id}`,
    `Student: ${tx.student}`,
    `Institute: ${tx.institute}`,
    `Amount: ${formatCurrency(tx.fee)}`,
    `Date: ${tx.date}`,
    "---------------------------",
    "Thank you for your payment.",
  ].join("\n");
}

function downloadReceipt(tx: Transaction) {
  const blob = new Blob([tx.receipt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Receipt-${tx.id}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// 🔹 Mock Data: 10 Students + 10 Institutes
const STUDENTS: StudentEnrollment[] = [
  { id: "S1", studentName: "Aarav", courseName: "B.Tech CSE", duration: "4Y", fee: 12000, status: "Payment Pending" },
  { id: "S2", studentName: "Diya", courseName: "MBA", duration: "2Y", fee: 15000, status: "Accepted" },
  { id: "S3", studentName: "Rahul", courseName: "B.Com", duration: "3Y", fee: 8000, status: "Rejected" },
  { id: "S4", studentName: "Sneha", courseName: "B.Sc Physics", duration: "3Y", fee: 6000, status: "Accepted" },
  { id: "S5", studentName: "Vikram", courseName: "M.Tech AI", duration: "2Y", fee: 18000, status: "Payment Pending" },
  { id: "S6", studentName: "Meera", courseName: "BBA", duration: "3Y", fee: 9000, status: "Accepted" },
  { id: "S7", studentName: "Arjun", courseName: "B.Sc Chemistry", duration: "3Y", fee: 7000, status: "Rejected" },
  { id: "S8", studentName: "Kavya", courseName: "B.Tech IT", duration: "4Y", fee: 14000, status: "Payment Pending" },
  { id: "S9", studentName: "Ishaan", courseName: "MBA", duration: "2Y", fee: 16000, status: "Accepted" },
  { id: "S10", studentName: "Priya", courseName: "B.Sc Maths", duration: "3Y", fee: 8500, status: "Payment Pending" },
];

const INSTITUTES: Institute[] = [
  { id: "I1", name: "ABC Institute", branch: "Chennai", minFee: 5000, status: "Accepted" },
  { id: "I2", name: "XYZ Institute", branch: "Mumbai", minFee: 6000, status: "Payment Pending" },
  { id: "I3", name: "LMN College", branch: "Delhi", minFee: 4000, status: "Rejected" },
  { id: "I4", name: "PQR University", branch: "Bangalore", minFee: 7000, status: "Accepted" },
  { id: "I5", name: "GHI Academy", branch: "Hyderabad", minFee: 5500, status: "Payment Pending" },
  { id: "I6", name: "JKL Institute", branch: "Kolkata", minFee: 4500, status: "Accepted" },
  { id: "I7", name: "MNO University", branch: "Pune", minFee: 6500, status: "Payment Pending" },
  { id: "I8", name: "STU College", branch: "Chennai", minFee: 6000, status: "Rejected" },
  { id: "I9", name: "VWX Academy", branch: "Delhi", minFee: 4800, status: "Accepted" },
  { id: "I10", name: "YZA Institute", branch: "Bangalore", minFee: 5000, status: "Payment Pending" },
];

const PaymentHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"students" | "institutes" | "transactions">("students");
  const [students, setStudents] = useState<StudentEnrollment[]>(STUDENTS);
  const [institutes, setInstitutes] = useState<Institute[]>(INSTITUTES);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleAccept = (id: string, type: "student" | "institute") => {
    if (type === "student") {
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "Accepted" } : s))
      );
      const st = students.find((s) => s.id === id);
      if (st) {
        const tx: Transaction = {
          id: "TX-" + Math.random().toString(36).slice(2, 9).toUpperCase(),
          student: st.studentName,
          institute: "—",
          fee: st.fee,
          date: new Date().toLocaleString(),
          receipt: "",
        };
        tx.receipt = generateReceipt(tx);
        setTransactions([tx, ...transactions]);
      }
    } else {
      setInstitutes((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "Accepted" } : i))
      );
      const inst = institutes.find((i) => i.id === id);
      if (inst) {
        const tx: Transaction = {
          id: "TX-" + Math.random().toString(36).slice(2, 9).toUpperCase(),
          student: "—",
          institute: inst.name,
          fee: inst.minFee,
          date: new Date().toLocaleString(),
          receipt: "",
        };
        tx.receipt = generateReceipt(tx);
        setTransactions([tx, ...transactions]);
      }
    }
  };

  const handleReject = (id: string, type: "student" | "institute") => {
    if (type === "student") {
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "Rejected" } : s))
      );
    } else {
      setInstitutes((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "Rejected" } : i))
      );
    }
  };

  const filteredStudents = students.filter((s) =>
    s.studentName.toLowerCase().includes(search.toLowerCase())
  );
  const filteredInstitutes = institutes.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[1200px] bg-none text-white ">
      <div className="max-w-7xl mx-auto px-6 py-8 ">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 ">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-lg ${activeTab === "students" ? "bg-pink-600" : "bg-gray-800"}`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab("institutes")}
            className={`px-4 py-2 rounded-lg ${activeTab === "institutes" ? "bg-pink-600" : "bg-gray-800"}`}
          >
            Institutes
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-lg ${activeTab === "transactions" ? "bg-pink-600" : "bg-gray-800"}`}
          >
            Transactions
          </button>
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${activeTab}...`}
          className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 mb-6"
        />

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredStudents.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex items-center gap-3 mb-2 ">
                  <UserCircleIcon className="h-8 w-8 text-pink-500" />
                  <div>
                    <p className="font-bold">{s.studentName}</p>
                    <p className="text-sm text-gray-400">{s.courseName} • {s.duration}</p>
                  </div>
                </div>
                <p className="mb-2">Fee: {formatCurrency(s.fee)}</p>
                <p
                  className={`inline-block px-3 py-1 rounded-full text-xs ${
                    s.status === "Accepted"
                      ? "bg-green-600"
                      : s.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {s.status}
                </p>
                {s.status === "Payment Pending" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleAccept(s.id, "student")}
                      className="px-3 py-1 bg-green-600 rounded-md text-xs"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(s.id, "student")}
                      className="px-3 py-1 bg-red-600 rounded-md text-xs"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Institutes Tab */}
        {activeTab === "institutes" && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredInstitutes.map((i) => (
              <motion.div
                key={i.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex items-center gap-3 mb-2">
                  <BuildingOffice2Icon className="h-8 w-8 text-pink-500" />
                  <div>
                    <p className="font-bold">{i.name}</p>
                    <p className="text-sm text-gray-400">{i.branch}</p>
                  </div>
                </div>
                <p className="mb-2">Min Fee: {formatCurrency(i.minFee)}</p>
                <p
                  className={`inline-block px-3 py-1 rounded-full text-xs ${
                    i.status === "Accepted"
                      ? "bg-green-600"
                      : i.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {i.status}
                </p>
                {i.status === "Payment Pending" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleAccept(i.id, "institute")}
                      className="px-3 py-1 bg-green-600 rounded-md text-xs"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(i.id, "institute")}
                      className="px-3 py-1 bg-red-600 rounded-md text-xs"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-4">
            {transactions.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{t.student || t.institute}</p>
                  <p className="text-sm text-gray-400">{t.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-green-400">
                    {formatCurrency(t.fee)}
                  </p>
                  <button
                    onClick={() => downloadReceipt(t)}
                    className="flex items-center gap-1 px-3 py-1 bg-pink-600 rounded-md text-xs"
                  >
                    <DocumentArrowDownIcon className="h-4 w-4" /> Download
                  </button>
                </div>
              </motion.div>
            ))}
            {transactions.length === 0 && (
              <p className="text-gray-400">No transactions yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
