import { useState } from "react";
import { motion} from "framer-motion";
import "../components/ui/styles/Navbar.css";
import "../components/ui/Navbar";
import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  Briefcase,
  
} from "lucide-react";


// ---------------- Mock Data ----------------
const stats = [
  { label: "Students", value: 1240, icon: Users },
  { label: "Institutes", value: 12, icon: Building2 },
  { label: "Courses", value: 48, icon: BookOpen },
  { label: "Branches", value: 22, icon: GraduationCap },
  { label: "Recruitments", value: 35, icon: Briefcase },
];




interface Notification {
  id: number;
  type: "placement" | "enrollment";
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

const notifications: Notification[] = [
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
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value }) => (
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

interface TabButtonProps {
  value: "overview" | "analytics" | "list" | "notify";
  active: boolean;
  onClick: (value: "overview" | "analytics" | "list" | "notify") => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ value, active, onClick, children }) => (
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
export default function Home() {
  const [tab, setTab] = useState<"overview" | "analytics" | "list" | "notify">("overview");
  const [query, setQuery] = useState("");
  const [] = useState<Notification[]>(notifications);


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

        {/* Tab Content */}
        <div className="space-y-6">
          {/* ...rest of your tab content remains unchanged */}
        </div>
      </div>
    </div>
  );
}
