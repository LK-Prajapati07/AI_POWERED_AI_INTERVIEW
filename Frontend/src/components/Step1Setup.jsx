import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaChartLine,
  FaFileUpload,
  FaUpload
} from "react-icons/fa";

import { useAnalyzeResume } from "@/Hooks/analyzeResume";
import { useGenerateQuestions } from "@/Hooks/Interview.hooks";
import { Spinner } from "./ui/spinner";

const Step1Setup = ({ onStart }) => {

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const {
    mutateAsync: analyzeResume,
    isPending: analyzing
  } = useAnalyzeResume();

  const {
    mutate: generateInterview,
    isPending: generating
  } = useGenerateQuestions();

  /* ================================
     Resume Analysis
  ================================= */

  const handleAnalyzeResume = async () => {
    if (!resume) return;

    try {
      const data = await analyzeResume(resume);

      setRole(data.role || "");
      setExperience(data.experience || "");
      setProjects(data.projects || []);
      setSkills(data.skills || []);
      setResumeText(data.resumeText || "");
      setIsAnalyzed(true);

    } catch (error) {
      console.error("Resume analysis failed:", error);
    }
  };

  /* ================================
     Start Interview
  ================================= */

  const handleStart = () => {
    if (!isFormValid) return;

    generateInterview(
      {
        role,
        experience,
        mode: interviewType,
        resumeText,
        projects,
        skills,
      },
      {
        onSuccess: (data) => {
          if (onStart) onStart(data);
        },
      }
    );
  };

  const isFormValid =
    role &&
    experience &&
    interviewType &&
    resume &&
    isAnalyzed;

  /* ================================
     Features Section
  ================================= */

  const features = useMemo(() => [
    {
      icon: <FaUserTie />,
      title: "Personalized Setup",
      desc: "AI adapts interview difficulty to your role."
    },
    {
      icon: <FaBriefcase />,
      title: "Smart Interview Flow",
      desc: "Dynamic follow-up questions."
    },
    {
      icon: <FaChartLine />,
      title: "Performance Tracking",
      desc: "Real-time scoring & insights."
    },
    {
      icon: <FaFileUpload />,
      title: "Resume Based Questions",
      desc: "Generated directly from your CV."
    },
  ], []);

  /* ================================
     UI
  ================================= */

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-6 py-12">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl grid md:grid-cols-2 border border-white/40 overflow-hidden"
      >

        {/* LEFT SECTION */}
        <div className="p-10 md:p-14 bg-linear-to-br from-indigo-50 via-white to-purple-50">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Setup Your Interview
          </h2>

          <p className="text-gray-500 mb-8 text-sm md:text-base">
            Upload your resume and let AI personalize your interview experience.
          </p>

          <div className="space-y-5">

            {/* Role */}
            <input
              type="text"
              placeholder="Enter Role (e.g. MERN Developer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />

            {/* Experience */}
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            >
              <option value="">Select Experience</option>
              <option value="Fresher">Fresher</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>

            {/* Interview Type */}
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            >
              <option value="">Select Interview Type</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Mixed">Mixed</option>
            </select>

            {/* Resume Upload */}
            <label className="flex items-center justify-center gap-3 px-4 py-4 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:bg-indigo-50 transition">
              <FaUpload className="text-indigo-500" />
              <span className="text-sm text-gray-600">
                {resume ? resume.name : "Upload Resume (PDF)"}
              </span>
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => {
                  setResume(e.target.files[0]);
                  setIsAnalyzed(false);
                  setProjects([]);
                  setSkills([]);
                }}
              />
            </label>

            {/* Analyze Button */}
            {resume && !isAnalyzed && (
              <button
                onClick={handleAnalyzeResume}
                disabled={analyzing}
                className="w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
              >
                {analyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    Analyzing <Spinner size={20} />
                  </span>
                ) : (
                  "Analyze Resume"
                )}
              </button>
            )}

            {/* Extracted Projects & Skills */}
            {isAnalyzed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl border border-gray-200 p-4 space-y-4 shadow-sm"
              >

                {projects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">
                      Projects
                    </h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                      {projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            )}
            <button
              onClick={handleStart}
              disabled={!isFormValid || generating}
              className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300
              ${isFormValid
                  ? "bg-linear-to-r from-indigo-600 to-purple-600 hover:scale-105 shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {generating ? (
                <span className="flex items-center justify-center gap-2">
                  Starting <Spinner size={20} />
                </span>
              ) : (
                "Start Interview"
              )}
            </button>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="p-10 grid gap-6 sm:grid-cols-2 bg-white/60">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.03 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  );
};

export default Step1Setup;