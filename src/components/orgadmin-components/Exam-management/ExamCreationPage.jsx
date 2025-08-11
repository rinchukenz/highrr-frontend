import React, { useState, useEffect } from "react";
import { getAllQuestions, createExam } from "../../../services/OrgAdminService";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ExamCreationPage() {

  const { auth } = useAuth();

  const navigate = useNavigate();

  console.log(auth.adminId);

  const [examData, setExamData] = useState({
    title: "",
    description: "",
    instructions: "",
    type: "MCQ",
    examMode: "SCHEDULED",
    visibility: "PUBLIC",
    totalMarks: 0,
    passingPercentage: 40,
    allowTabSwitching: false,
    proctoringEnabled: false,
    startTime: "",
    endTime: "",
    durationMinutes: 60,
    maxAttempts: 1,
    createdBy: auth.organizationId, // Replace with actual admin ID
    questions: [],
  });

  const [questionBank, setQuestionBank] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filterType, setFilterType] = useState("ALL");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filteredQuestions =
    filterType === "ALL"
      ? questionBank
      : questionBank.filter((q) => q.type === filterType);

  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
      setQuestionBank(response.data);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  const handleExamDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExamData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestionSelect = (questionId, isChecked) => {
    if (isChecked) {
      setSelectedQuestions((prev) => [
        ...prev,
        { questionId, marks: 0, questionOrder: prev.length + 1 },
      ]);
    } else {
      setSelectedQuestions((prev) =>
        prev.filter((q) => q.questionId !== questionId)
      );
    }
  };

  const handleQuestionDetailsChange = (index, field, value) => {
    const updated = [...selectedQuestions];
    updated[index][field] =
      field === "marks" ? parseInt(value) : parseInt(value);
    setSelectedQuestions(updated);
  };

  const handleSubmit = async () => {
    const totalMarks = selectedQuestions.reduce((acc, q) => acc + q.marks, 0);
    const payload = { ...examData, questions: selectedQuestions, totalMarks };

    try {
      await createExam(payload);
      alert("Exam Created Successfully!");
      navigate(-1);
      // Reset form or redirect
    } catch (error) {
      console.error("Failed to create exam", error);
      alert("Error while creating exam.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create New Exam</h1>

      {/* Exam Details */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          onChange={handleExamDataChange}
          className="border p-2 rounded col-span-2"
        />

        <select
          name="type"
          value={examData.type}
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        >
          <option value="MCQ">MCQ</option>
          <option value="CODING">Coding</option>
          <option value="LONG_ANSWER">LONG ANSWER</option>
          <option value="MIXED">MIXED</option>
        </select>

        <select
          name="examMode"
          value={examData.examMode}
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        >
          <option value="SCHEDULED">Scheduled</option>
          <option value="ON_DEMAND">ON DEMAND</option>
        </select>

        <select
          name="visibility"
          value={examData.visibility}
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        >
          <option value="PUBLIC">Public</option>
          <option value="ASSIGNED">ASSIGNED</option>
        </select>

        <input
          type="datetime-local"
          name="startTime"
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="endTime"
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="durationMinutes"
          placeholder="Duration (minutes)"
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="passingPercentage"
          placeholder="Passing %"
          onChange={handleExamDataChange}
          className="border p-2 rounded"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="allowTabSwitching"
            onChange={handleExamDataChange}
          />
          <label>Allow Tab Switching</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="proctoringEnabled"
            onChange={handleExamDataChange}
          />
          <label>Enable Proctoring</label>
        </div>
      </div>

      {/* Question Bank Selector */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-2">Select Questions</h2>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">All Questions</option>
            <option value="MCQ">MCQ</option>
            <option value="CODING">CODING</option>
            <option value="LONG_ANSWER">LONG ANSWER</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredQuestions.map((q) => {
            const isSelected = selectedQuestions.some(
              (sq) => sq.questionId === q.id
            );
            return (
              <div
                key={q.id}
                className="border p-2 rounded flex justify-between items-center"
              >
                <div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) =>
                      handleQuestionSelect(q.id, e.target.checked)
                    }
                    className="mr-2"
                  />
                  {q.title} ({q.type})
                </div>
                {isSelected && (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Marks"
                      value={
                        selectedQuestions.find((sq) => sq.questionId === q.id)
                          ?.marks || ""
                      }
                      onChange={(e) =>
                        handleQuestionDetailsChange(
                          selectedQuestions.findIndex(
                            (sq) => sq.questionId === q.id
                          ),
                          "marks",
                          e.target.value
                        )
                      }
                      className="border p-1 rounded w-20"
                    />
                    <input
                      type="number"
                      placeholder="Order"
                      value={
                        selectedQuestions.find((sq) => sq.questionId === q.id)
                          ?.questionOrder || ""
                      }
                      onChange={(e) =>
                        handleQuestionDetailsChange(
                          selectedQuestions.findIndex(
                            (sq) => sq.questionId === q.id
                          ),
                          "questionOrder",
                          e.target.value
                        )
                      }
                      className="border p-1 rounded w-20"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Create Exam
        </button>
      </div>
    </div>
  );
}

export default ExamCreationPage;
