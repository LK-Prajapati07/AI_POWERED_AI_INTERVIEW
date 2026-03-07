import Step3IntervewReport from "@/components/Step3IntervewReport";
import { Spinner } from "@/components/ui/spinner";
import { usegetInterviewReport } from "@/Hooks/Interview.hooks";
import React from "react";
import { useParams } from "react-router-dom";

const InterviewReport = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = usegetInterviewReport(id);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Failed to load report
        </p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          No interview report found
        </p>
      </div>
    );
  }

  return <Step3IntervewReport report={data} />;
};

export default InterviewReport;