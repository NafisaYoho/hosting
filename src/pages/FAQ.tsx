import  { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function AdminFAQ() {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState<FAQItem[]>([
    { id: 1, question: "How to reset password?", answer: "Go to settings and click reset password." },
    { id: 2, question: "How to update payment details?", answer: "Go to profile > Payment Settings." },
    { id: 3, question: "How to view invoices?", answer: "Check Payment History in your dashboard." },
    { id: 4, question: "What payment methods are supported?", answer: "Credit card, Debit card, Netbanking, UPI." },
    { id: 5, question: "Is my payment secure?", answer: "Yes, we use SSL and secure gateways." },
    { id: 6, question: "Can I get a refund?", answer: "Refunds are processed within 7 business days." },
    { id: 7, question: "How to change my email?", answer: "Update email in profile settings." },
    { id: 8, question: "What if payment fails?", answer: "Try again or contact support." },
    { id: 9, question: "Can I save my card for future?", answer: "Yes, cards can be saved securely." },
    { id: 10, question: "Do you support recurring payments?", answer: "Yes, recurring payment setup is available." },
  ]);

  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  const addFAQ = () => {
    if (!newQ || !newA) return;
    setFaqs([...faqs, { id: Date.now(), question: newQ, answer: newA }]);
    setNewQ("");
    setNewA("");
  };

  const deleteFAQ = (id: number) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  return (
    <div className="p-6 pb-20 bg-black min-h-screen flex flex-col items-center">
      {/* Sticky Close Button */}
      <div className="w-full max-w-4xl sticky top-0 bg-black z-50 py-4 flex justify-end">
        <button
          onClick={() => navigate("/home")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <X size={16} /> Close
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-pink-500 text-center">
        Admin – Payment Gateway FAQ
      </h2>

      {/* Add New FAQ */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Enter Question"
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded-lg flex-1 focus:outline-none focus:border-pink-500 transition"
        />
        <input
          type="text"
          placeholder="Enter Answer"
          value={newA}
          onChange={(e) => setNewA(e.target.value)}
          className="border border-gray-700 bg-gray-900 text-white p-3 rounded-lg flex-1 focus:outline-none focus:border-pink-500 transition"
        />
        <button
          onClick={addFAQ}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
        >
          Add
        </button>
      </div>

      {/* FAQ List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {faqs.map((f) => (
          <motion.div
            key={f.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col justify-between hover:border-pink-500 transition"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col gap-1 mb-3">
              <p className="font-semibold text-white">{f.question}</p>
              <p className="text-gray-400 text-sm">{f.answer}</p>
            </div>
            <button
              onClick={() => deleteFAQ(f.id)}
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
