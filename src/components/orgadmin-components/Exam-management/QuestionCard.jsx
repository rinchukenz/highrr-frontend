import React, { useEffect, useState } from "react";
import { getQuestionById } from "../../../services/OrgAdminService";

function QuestionCard({ question }) {
  const [que, setQue] = useState(null);

  const fetchQuestionDetails = async () => {
    try {
      const response = await getQuestionById(question.questionId);
      setQue(response.data);
      console.log("QUESTION DETAILS:", response.data);
    } catch (error) {
      console.error("Error fetching question details", error);
      alert("Failed to fetch question details");
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, [question.questionId]);

  if (!que)
    return (
      <div className="p-4 border rounded bg-gray-100">Loading question...</div>
    );

  return (
    <div className="border p-4 rounded bg-white shadow">
      <p>
        <strong>Question:</strong> {que.title}
      </p>
      <p>
        <strong>Type:</strong> {que.type}
      </p>
      <p>
        <strong>Marks:</strong> {question.marks}
      </p>
      <p>
        <strong>Order:</strong> {question.questionOrder}
      </p>

      {/* You can show additional fields based on question type */}
      {que.questionType === "MCQ" && (
        <div className="mt-2 space-y-1">
          {que.options?.map((opt, idx) => (
            <div key={idx} className="ml-4">
              <input
                type="radio"
                disabled
                checked={que.correctOption === opt}
              />
              <label className="ml-2">{opt}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
