import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// Types
type Institute = {
  id: number;
  name: string;
  branches: number;
  status: string;
};

type Merchant = {
  id: number;
  name: string;
  feePaid: boolean;
  pendingCourses: number;
  pendingDiscounts: number;
};

type Course = {
  id: number;
  name: string;
  fee: number;
  duration: string;
  status: string;
};

type Discount = {
  id: number;
  name: string;
  status: string;
  merchant: string;
};

// Dummy Data
const institutes: Institute[] = [
  { id: 1, name: "ABC Institute", branches: 3, status: "Active" },
  { id: 2, name: "XYZ Institute", branches: 2, status: "Pending Approval" },
];

const merchants: Merchant[] = [
  { id: 1, name: "Merchant A", feePaid: true, pendingCourses: 2, pendingDiscounts: 1 },
  { id: 2, name: "Merchant B", feePaid: false, pendingCourses: 1, pendingDiscounts: 0 },
];

const courses: Course[] = [
  { id: 1, name: "B.Tech CSE", fee: 12000, duration: "4 Years", status: "Pending Approval" },
  { id: 2, name: "MBA", fee: 15000, duration: "2 Years", status: "Approved" },
];

const discounts: Discount[] = [
  { id: 1, name: "Summer Sale", status: "Pending Approval", merchant: "Merchant A" },
  { id: 2, name: "Festive Offer", status: "Approved", merchant: "Merchant B" },
];

// Reusable Tab Button
type TabButtonProps = {
  value: string;
  active: boolean;
  onClick: (val: string) => void;
  children: React.ReactNode;
};

const TabButton = ({ value, active, onClick, children }: TabButtonProps) => (
  <button
    onClick={() => onClick(value)}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
      active ? "bg-pink-600 text-white" : "bg-gray-800/60 text-gray-300 hover:bg-gray-800/80"
    }`}
  >
    {children}
  </button>
);

export default function InstitutePage() {
  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");

  const filteredInstitutes = useMemo(() => {
    if (!query) return institutes;
    return institutes.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-6">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-600">Institute / Merchant Management</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            className="pl-9 pr-3 py-2 border border-gray-700 rounded-xl text-sm bg-gray-900/70 text-white placeholder-gray-400 backdrop-blur-md focus:ring-pink-600 focus:border-pink-600"
            placeholder="Search Institutes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <TabButton value="overview" active={tab === "overview"} onClick={setTab}>Overview</TabButton>
        <TabButton value="merchant" active={tab === "merchant"} onClick={setTab}>Merchant Management</TabButton>
        <TabButton value="courses" active={tab === "courses"} onClick={setTab}>Course Approval</TabButton>
        <TabButton value="branches" active={tab === "branches"} onClick={setTab}>Branch Management</TabButton>
        <TabButton value="discounts" active={tab === "discounts"} onClick={setTab}>Discount Approval</TabButton>
      </div>

      <div className="space-y-6">
        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {filteredInstitutes.map((i) => (
              <motion.div
                key={i.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4"
              >
                <h2 className="font-semibold text-pink-600">{i.name}</h2>
                <p>Branches: {i.branches}</p>
                <p>Status: {i.status}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Merchant Management */}
        {tab === "merchant" && (
          <div className="space-y-4">
            {merchants.map((m) => (
              <div key={m.id} className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-pink-600">{m.name}</h2>
                  <p>Fee Paid: {m.feePaid ? "Yes" : "No"}</p>
                  <p>Pending Courses: {m.pendingCourses}</p>
                  <p>Pending Discounts: {m.pendingDiscounts}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-pink-600 px-3 py-1 rounded-xl">Approve</button>
                  <button className="bg-gray-700 px-3 py-1 rounded-xl">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Courses Tab */}
        {tab === "courses" && (
          <div className="space-y-4">
            {courses.map((c) => (
              <div key={c.id} className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-pink-600">{c.name}</h2>
                  <p>Fee: {c.fee}</p>
                  <p>Duration: {c.duration}</p>
                  <p>Status: {c.status}</p>
                </div>
                {c.status === "Pending Approval" && (
                  <div className="flex gap-2">
                    <button className="bg-pink-600 px-3 py-1 rounded-xl">Approve</button>
                    <button className="bg-gray-700 px-3 py-1 rounded-xl">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Branch Management */}
        {tab === "branches" && (
          <div className="space-y-4">
            {institutes.map((i) => (
              <div key={i.id} className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4">
                <h2 className="font-semibold text-pink-600">{i.name}</h2>
                <p>Branches: {i.branches}</p>
                <button className="bg-pink-600 px-3 py-1 rounded-xl mt-2">Approve New Branch</button>
              </div>
            ))}
          </div>
        )}

        {/* Discount Approval */}
        {tab === "discounts" && (
          <div className="space-y-4">
            {discounts.map((d) => (
              <div key={d.id} className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-pink-600">{d.name}</h2>
                  <p>Merchant: {d.merchant}</p>
                  <p>Status: {d.status}</p>
                </div>
                {d.status === "Pending Approval" && (
                  <div className="flex gap-2">
                    <button className="bg-pink-600 px-3 py-1 rounded-xl">Approve</button>
                    <button className="bg-gray-700 px-3 py-1 rounded-xl">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
