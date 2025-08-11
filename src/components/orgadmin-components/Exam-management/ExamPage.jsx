import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../services/OrgAdminService";
import QuestionCard from "./QuestionCard";

function ExamPage() {
  const { eid } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);

  const fetchExam = async (eid) => {
    try {
      const response = await getExamById(eid);
      console.log(response.data);
      setExam(response.data);
    } catch (error) {
      console.error("Error fetching exam", error);
      alert("Failed to fetch exam");
    }
  };

  useEffect(() => {
    fetchExam(eid);
  }, [eid]);

  if (!exam) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-lg animate-pulse">
          Loading exam details...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        ← Back
      </button>

      {/* Exam Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-400">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{exam.title}</h1>
        <p className="text-gray-600">{exam.description}</p>
      </div>

      {/* Exam Details */}
      <div className="bg-white rounded-xl p-6 mt-6 border border-gray-400">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Exam Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <Detail label="Mode" value={exam.examMode} />
          <Detail label="Type" value={exam.type} />
          <Detail label="Duration" value={`${exam.durationMinutes} minutes`} />
          <Detail label="Max Attempts" value={exam.maxAttempts} />
          <Detail label="Total Marks" value={exam.totalMarks} />
          <Detail label="Passing %" value={`${exam.passingPercentage}%`} />
          <Detail label="Visibility" value={exam.visibility} />
          <Detail
            label="Proctoring"
            value={exam.proctoringEnabled ? "Enabled" : "Disabled"}
          />
          <Detail
            label="Allow Tab Switching"
            value={exam.allowTabSwitching ? "Yes" : "No"}
          />
          <Detail
            label="Start Time"
            value={new Date(exam.startTime).toLocaleString()}
          />
          <Detail
            label="End Time"
            value={new Date(exam.endTime).toLocaleString()}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl p-6 mt-6 border border-gray-400">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Instructions
        </h2>
        <p className="text-gray-700 leading-relaxed">{exam.instructions}</p>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-xl p-6 mt-6 border border-gray-400">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions</h2>
        {exam.questions?.length > 0 ? (
          <ul className="space-y-4">
            {exam.questions.map((q) => (
              <QuestionCard key={q.questionId} question={q} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No questions added yet.</p>
        )}
      </div>
    </div>
  );
}

// Small reusable detail component
const Detail = ({ label, value }) => (
  <p className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
    <strong className="text-gray-800">{label}:</strong>{" "}
    <span className="text-gray-600">{value}</span>
  </p>
);

export default ExamPage;
