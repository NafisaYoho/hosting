import  { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AboutUsContent {
  title: string;
  description: string;
  mission: string;
  vision: string;
  adminName: string;
  adminRole: string;
}

export default function AboutUsPage() {
  const navigate = useNavigate();

  const [about, setAbout] = useState<AboutUsContent>({
    title: "Welcome to Our Institute",
    description:
      "We provide quality education and support to students and institutions.",
    mission: "Empower students with knowledge and skills.",
    vision: "Become the leading education platform in the region.",
    adminName: "Admin User",
    adminRole: "Administrator",
  });

  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<AboutUsContent>(about);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [draft.description, draft.mission, draft.vision, editMode]);

  const saveChanges = () => {
    setAbout(draft);
    setEditMode(false);
  };

  return (
    <div className="p-6 bg-black min-h-screen flex flex-col items-center">
      {/* Sticky Close Button */}
      <div className="w-full max-w-4xl sticky top-0 bg-black z-50 py-4 flex justify-end shadow-md">
        <button
          onClick={() => navigate("/home")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Close
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-pink-500 text-center">
        About Us
      </h2>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-6 mt-6">
        {/* Admin/Author Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-lg">
            {about.adminName.charAt(0)}
          </div>
          <div>
            <p className="text-white font-semibold">{about.adminName}</p>
            <p className="text-gray-400 text-sm">{about.adminRole}</p>
          </div>
        </div>

        {editMode ? (
          <>
            {/* Title */}
            <input
              type="text"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-pink-500 transition"
              placeholder="Title"
            />
            {/* Description */}
            <textarea
              ref={textAreaRef}
              value={draft.description}
              onChange={(e) =>
                setDraft({ ...draft, description: e.target.value })
              }
              className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-pink-500 transition resize-none overflow-hidden"
              placeholder="Description"
            />
            {/* Mission */}
            <textarea
              value={draft.mission}
              onChange={(e) =>
                setDraft({ ...draft, mission: e.target.value })
              }
              className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-pink-500 transition resize-none overflow-hidden"
              placeholder="Mission"
            />
            {/* Vision */}
            <textarea
              value={draft.vision}
              onChange={(e) =>
                setDraft({ ...draft, vision: e.target.value })
              }
              className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-pink-500 transition resize-none overflow-hidden"
              placeholder="Vision"
            />
            <div className="flex gap-3 flex-wrap mt-2">
              <button
                onClick={saveChanges}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg shadow transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-white">{about.title}</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {about.description}
            </p>
            <p className="text-pink-500 font-semibold mt-4">Mission:</p>
            <p className="text-gray-300 leading-relaxed">{about.mission}</p>
            <p className="text-pink-500 font-semibold mt-4">Vision:</p>
            <p className="text-gray-300 leading-relaxed">{about.vision}</p>
            <button
              onClick={() => {
                setDraft(about);
                setEditMode(true);
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg shadow transition self-start mt-4"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
