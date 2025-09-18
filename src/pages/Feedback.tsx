import React, { useState } from "react";

interface FeedbackItem {
  id: number;
  user: string;
  message: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([
    { id: 1, user: "Student1", message: "Great course!", status: "Pending" },
    { id: 2, user: "Student2", message: "Loved the explanation.", status: "Pending" },
    { id: 3, user: "Student3", message: "Could use more examples.", status: "Pending" },
    { id: 4, user: "Student4", message: "Awesome teaching style.", status: "Pending" },
    { id: 5, user: "Student5", message: "Too fast-paced.", status: "Pending" },
    { id: 6, user: "Student6", message: "Well structured content.", status: "Pending" },
    { id: 7, user: "Student7", message: "Helpful and clear.", status: "Pending" },
    { id: 8, user: "Student8", message: "Can improve visuals.", status: "Pending" },
    { id: 9, user: "Student9", message: "Loved the examples.", status: "Pending" },
    { id: 10, user: "Student10", message: "Would recommend to friends.", status: "Pending" },
  ]);

  const handleStatus = (id: number, status: "Approved" | "Rejected") => {
    setFeedbackList((prev) =>
      prev.map((fb) => (fb.id === id ? { ...fb, status } : fb))
    );
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold text-pink-500 mb-6">Admin Feedback</h2>

      {/* 2-column grid, auto height, bottom padding to show last card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        {feedbackList.map((fb) => (
          <div
            key={fb.id}
            className="p-5 bg-gray-800 rounded-xl border border-gray-700 shadow-md flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-semibold text-pink-400 text-sm">{fb.user}</span>
              <span className="text-xs text-gray-400">{fb.status}</span>
            </div>

            <p className="text-gray-200 text-sm mb-3">{fb.message}</p>

            {fb.status === "Pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatus(fb.id, "Approved")}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatus(fb.id, "Rejected")}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
