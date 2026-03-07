import { Spinner } from "@/components/ui/spinner";
import { useGetmyInterview } from "@/Hooks/Interview.hooks";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InterviewHistory = () => {

  const [interviews, setInterviews] = useState([]);
  const nav = useNavigate();

  const { data, isLoading } = useGetmyInterview();

  useEffect(() => {
    if (data) {
      setInterviews(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <Spinner size={24} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 py-6">

      <div className="w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto">

        {/* Header */}
        <div className="mb-10 flex items-start gap-4">

          <button
            className="mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition"
            onClick={() => nav("/")}
          >
            <FaArrowLeft className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Interview History
            </h1>
            <p className="text-gray-500 mt-2">
              Track your interviews, continue pending ones, and view reports
            </p>
          </div>

        </div>

        {interviews.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <p className="text-gray-500">
              No interviews found. Start your first AI interview.
            </p>
          </div>
        ) : (

          <div className="grid gap-4">

            {interviews.map((item) => (

              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  {/* Interview Info */}
                  <div>
                    <h3 className="text-gray-800 text-lg font-semibold">
                      {item.role}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {item.experience} • {item.mode}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Score + Status */}
                  <div className="flex items-center gap-6">

                    {item.status === "Completed" && (
                      <div className="text-right">
                        <p className="text-xl font-bold text-emerald-600">
                          {item.finalScore || 0}/10
                        </p>
                        <p className="text-xs text-gray-400">Overall Score</p>
                      </div>
                    )}

                    <span
                      className={`px-4 py-1 rounded-full text-xs font-medium
                      ${
                        item.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status === "Completed"
                        ? "Completed"
                        : "Step 2 Pending"}
                    </span>

                    {/* Action Button */}
                    {item.status === "Completed" ? (
                      <button
                        onClick={() => nav(`/interviewReport/${item._id}`)}
                        className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                      >
                        View Report
                      </button>
                    ) : (
                      <button
                        onClick={() => nav(`/interview/${item._id}`)}
                        className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        <FaPlay size={12} />
                        Continue
                      </button>
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default InterviewHistory;
