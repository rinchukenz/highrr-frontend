import React, { useEffect, useState } from 'react';
import AddQuestionModal from './AddQuestionModal';
import { getAllQuestions } from '../../../services/OrgAdminService';

function QuestionBank() {
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  

  const fetchQuestions = async () => {
    try {
        const response = await getAllQuestions();
        setQuestions(response.data);
        console.log(questions);
    }
    catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to fetch questions");
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Question Bank</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>
      </div>

      {/* Table of Questions will go here */}

      {showModal && (
        <AddQuestionModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default QuestionBank;
