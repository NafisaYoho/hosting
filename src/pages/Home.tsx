import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../components/ui/styles/Navbar.css";
import "../components/ui/Navbar";
import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  Briefcase,
  Bell,
  Search,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
} from "recharts";
import {

  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";




// ---------------- Mock Data ----------------
const stats = [
  { label: "Students", value: 1240, icon: Users },
  { label: "Institutes", value: 12, icon: Building2 },
  { label: "Courses", value: 48, icon: BookOpen },
  { label: "Branches", value: 22, icon: GraduationCap },
  { label: "Recruitments", value: 35, icon: Briefcase },
];

const monthlyAnalytics = [
  { month: "Jan", enrollments: 120, placements: 18 },
  { month: "Feb", enrollments: 140, placements: 22 },
  { month: "Mar", enrollments: 200, placements: 28 },
  { month: "Apr", enrollments: 180, placements: 24 },
  { month: "May", enrollments: 220, placements: 30 },
  { month: "Jun", enrollments: 260, placements: 35 },
  { month: "Jul", enrollments: 240, placements: 32 },
];

const students = Array.from({ length: 6 }).map((_, i) => ({
  id: `S-${1000 + i}`,
  name: ["Aarav", "Diya", "Ishaan", "Mira", "Kabir", "Anaya"][i],
  course: ["B.Tech CSE", "BBA", "MBA", "BCA"][i % 4],
  branch: ["Chennai", "Mumbai", "Bengaluru"][i % 3],
  status: ["Active", "On Hold", "Alumni"][i % 3],
}));

const notifications = [
  {
    id: 1,
    type: "placement",
    title: "New Placement Drive",
    desc: "TCS campus drive scheduled for Sep 20.",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    type: "enrollment",
    title: "15 New Enrollments",
    desc: "B.Tech CSE added 15 students today.",
    time: "4h ago",
    unread: true,
  },
];

// ---------------- Reusable Components ----------------
const StatCard = ({ icon: Icon, label, value }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <div className="rounded-2xl border border-gray-800 bg-gray-900/70 backdrop-blur-md p-5 hover:shadow-lg hover:shadow-pink-500/20 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="p-3 rounded-2xl bg-pink-600 text-white">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  </motion.div>
);

const TabButton = ({ value, active, onClick, children }) => (
  <button
    onClick={() => onClick(value)}
    className={`px-4 py-2 rounded-xl text-sm font-medium ${
      active
        ? "bg-pink-600 text-white"
        : "bg-gray-800/60 text-gray-300 hover:bg-gray-800/80"
    }`}
  >
    {children}
  </button>
);

// ---------------- Main Dashboard ----------------
export default function home() {
  const navigate = useNavigate("/Navbar");

  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [notify] = useState(notifications);

  const filtered = useMemo(() => {
    if (!query) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.course.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const unreadCount = notify.filter((n) => n.unread).length;

  return (
    <div className=" bg-transparent overflow-hidden text-white px-6 py-6">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-600">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
        
            
               <input
    type="text"
    placeholder="Search students..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-700 text-sm bg-gray-900/70 text-white placeholder-gray-400 backdrop-blur-md focus:ring-pink-600 focus:border-pink-600 transition"
  />
    </div>

  
  </div>
</div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-2 mb-6 flex-wrap">
          <TabButton value="overview" active={tab === "overview"} onClick={setTab}>
            Overview
          </TabButton>
          <TabButton value="analytics" active={tab === "analytics"} onClick={setTab}>
            Analytics
          </TabButton>
          <TabButton value="list" active={tab === "list"} onClick={setTab}>
            List View
          </TabButton>
          <TabButton value="notify" active={tab === "notify"} onClick={setTab}>
            Notifications
          </TabButton>
        </div>

        {/* Tab Content with spacing */}
        <div className="space-y-6">
          {tab === "overview" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4">
                <h2 className="font-semibold mb-2">Enrollments vs Placements</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <ReTooltip />
                      <Legend />
                      <Bar dataKey="enrollments" fill="#ec4899" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="placements" fill="#ffffff" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4">
                <h2 className="font-semibold mb-2">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {["Add Student", "Add Course", "New Branch", "Schedule Drive"].map(
                    (t) => (
                      <button
                        key={t}
                        className="flex items-center gap-2 bg-pink-600 text-white px-3 py-2 rounded-xl hover:bg-pink-700"
                      >
                        <ChevronRight className="h-4 w-4" /> {t}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {tab === "analytics" && (
            <div className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4 h-80">
              <h2 className="font-semibold mb-2">Monthly Analytics</h2>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="enrollments" fill="#ec4899" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="placements" fill="#ffffff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* List Tab */}
          {tab === "list" && (
            <div className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4 overflow-x-auto">
              <h2 className="font-semibold mb-2">Students List</h2>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-800/80 text-gray-300">
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Course</th>
                    <th className="p-2 text-left">Branch</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="p-2">{s.id}</td>
                      <td className="p-2">{s.name}</td>
                      <td className="p-2">{s.course}</td>
                      <td className="p-2">{s.branch}</td>
                      <td className="p-2">{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Notifications Tab */}
          {tab === "notify" && (
            <div className="border border-gray-800 rounded-2xl bg-gray-900/70 backdrop-blur-md p-4">
              <h2 className="font-semibold mb-2">Notifications</h2>
              <ul className="space-y-3">
                <AnimatePresence>
                  {notify.map((n) => (
                    <motion.li
                      key={n.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className={`rounded-xl border p-3 ${
                        n.unread
                          ? "bg-pink-600/10 border-pink-600"
                          : "bg-gray-800/60 border-gray-700"
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        <div
                          className={`p-2 rounded-xl ${
                            n.type === "placement"
                              ? "bg-white text-black"
                              : "bg-pink-600 text-white"
                          }`}
                        >
                          {n.type === "placement" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Users className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{n.title}</p>
                          <p className="text-sm text-gray-300">{n.desc}</p>
                          <span className="text-xs text-gray-500">{n.time}</span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
