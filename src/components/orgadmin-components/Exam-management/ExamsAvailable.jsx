import React, { useEffect, useState } from "react";
import { deleteExam, getExams } from "../../../services/OrgAdminService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

function ExamsAvailable() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const { auth } = useAuth();

  const fetchExams = async () => {
    try {
      const response = await getExams();
      const filtered = response.data.filter(
        (exam) => exam.createdBy === auth.organizationId
      );
      setExams(filtered);
      //setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams", error);
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await deleteExam(examId);
        toast.success("Exam deleted successfully");
        fetchExams();
      } catch (error) {
        console.error("Error deleting exam", error);
        alert("Failed to delete exam");
      }
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Available Exams</h1>
        <button
          onClick={() => navigate("/orgadmin/exams/create-exam")}
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
        >
          + Create New Exam
        </button>
      </div>

      {exams.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-left text-sm text-gray-600">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Passing %</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, idx) => (
                <tr
                  key={exam.id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td
                    className="p-3 border font-medium text-violet-700"
                    onClick={() => navigate(`/orgadmin/exams/${exam.id}`)}
                  >
                    {exam.title}
                  </td>
                  <td
                    className="p-3 border text-gray-700"
                    onClick={() => navigate(`/orgadmin/exams/${exam.id}`)}
                  >
                    {exam.description || "-"}
                  </td>
                  <td
                    className="p-3 border"
                    onClick={() => navigate(`/orgadmin/exams/${exam.id}`)}
                  >
                    {exam.type}
                  </td>
                  <td
                    className="p-3 border"
                    onClick={() => navigate(`/orgadmin/exams/${exam.id}`)}
                  >
                    {exam.passingPercentage}%
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No exams available.</p>
      )}
    </div>
  );
}

export default ExamsAvailable;
