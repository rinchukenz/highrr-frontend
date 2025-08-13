import React from "react";

function StudentCard({ student, onDelete }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-base">{student.name}</h3>
      <p className="text-sm text-gray-600">{student.email}</p>
      <p className="text-sm text-gray-500">{student.phoneNumber}</p>

      <div className="mt-4">
        <button
          onClick={() => onDelete(student.id)}
          className="text-xs bg-white border border-red-400 text-red-600 rounded px-3 py-1 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
