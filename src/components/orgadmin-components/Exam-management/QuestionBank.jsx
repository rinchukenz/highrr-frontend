import React, { useEffect, useState } from "react";
import AddQuestionModal from "./AddQuestionModal";
import {
  deleteQuestion,
  getAllQuestions,
} from "../../../services/OrgAdminService";
import { useNavigate } from "react-router-dom";

function QuestionBank() {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [filterType, setFilterType] = useState("ALL");
  const [selectedQuestion, setSelectedQuestion] = useState(null); // for editing mode

  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
      setQuestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(id);
        alert("Question deleted successfully");
        fetchQuestions();
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete question");
      }
    }
  };

  const filteredQuestions =
    filterType === "ALL"
      ? questions
      : questions.filter((q) => q.type === filterType);

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="p-10 mx-auto">
      <div className="flex justify-end items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Question Bank</h1> */}
        <div className="flex items-center space-x-4 mb-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">All Questions</option>
            <option value="MCQ">MCQ</option>
            <option value="CODING">CODING</option>
            <option value="LONG_ANSWER">LONG ANSWER</option>
          </select>

          <button
            onClick={() => {
              setSelectedQuestion(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Question
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Question</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Topic</th>
              <th className="border px-4 py-2">Difficulty</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q) => (
              <tr  key={q.id}>
                <td onClick={() => navigate(`/orgadmin/question-bank/${q.id}`)} className="border px-4 py-2 cursor-pointer">{q.title}</td>
                <td className="border px-4 py-2 text-center">{q.type}</td>
                <td className="border px-4 py-2 text-center">{q.topic}</td>
                <td className="border px-4 py-2 text-center">{q.difficulty}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No questions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddQuestionModal
          onClose={() => {
            setShowModal(false);
            fetchQuestions();
          }}
          initialData={selectedQuestion}
        />
      )}
    </div>
  );
}

export default QuestionBank;
