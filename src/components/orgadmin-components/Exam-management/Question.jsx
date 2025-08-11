import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionById } from "../../../services/OrgAdminService";
import { div } from "framer-motion/client";

function Question() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);

  const fetchQuestion = async (qid) => {
    try {
      const response = await getQuestionById(qid);
      setQuestion(response.data);
    } catch (error) {
      console.error("Error fetching question", error);
      alert("Failed to fetch question");
    }
  };

  useEffect(() => {
    fetchQuestion(qid);
  }, [qid]);

  console.log(question);

  if (!question) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6 border">
        <h1 className="text-2xl font-bold text-gray-800">Question : <span className="font-semibold">{question.title}</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Topic:</strong> {question.topic}
          </p>
          <p>
            <strong>Difficulty:</strong>{" "}
            <span className="uppercase">{question.difficulty}</span>
          </p>
          <p>
            <strong>Type:</strong>{" "}
            <span className="capitalize">{question.type.toLowerCase()}</span>
          </p>
          {question.tags?.length > 0 && (
            <p>
              <strong>Tags:</strong>{" "}
              <span className="text-sm italic">{question.tags.join(", ")}</span>
            </p>
          )}
        </div>

        {question.description && (
          <div>
            <h2 className="text-lg font-semibold mb-1">Description</h2>
            <p className="text-gray-600">{question.description}</p>
          </div>
        )}

        {question.type === "MCQ" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Options</h2>
            <ul className="list-disc list-inside space-y-1">
              {question.options?.map((opt, index) => (
                <li key={index}>
                  {opt.optionText}{" "}
                  {opt.correct && (
                    <span className="text-green-600 font-semibold">
                      (Correct)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {question.type === "CODING" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Test Cases</h2>
            <ul className="space-y-3">
              {question.codingTestCases?.map((testCase, index) => (
                <li
                  key={index}
                  className="border rounded p-3 bg-gray-50 text-sm font-mono"
                >
                  <div>
                    <strong>Input:</strong>
                    <pre className="whitespace-pre-wrap bg-white rounded mt-1 p-2 border">
                      {testCase.input}
                    </pre>
                  </div>
                  <div className="mt-2">
                    <strong>Expected Output:</strong>
                    <pre className="whitespace-pre-wrap bg-white rounded mt-1 p-2 border">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {
          question.type === "LONG_ANSWER" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Key Answer</h2>
              <p className="text-gray-600">{question.keyAnswer}</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Question;
