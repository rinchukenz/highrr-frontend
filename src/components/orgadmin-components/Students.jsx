import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";
import { div } from "framer-motion/client";
import {
  deleteStudent,
  getAllStudents,
  registerStudent,
  registerStudentBulk,
} from "../../services/OrgAdminService";
import { toast } from "react-toastify";

function Students() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isBulk, setIsBulk] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "STUDENT",
  });

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      console.log(response.data.content);
      setStudents(response.data.content);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerStudent(formData);
      fetchStudents();
      toast.success("Student registered successfully!");
      //alert("Student registered successfully!");
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "STUDENT",
      });
    } catch (err) {
      console.error(err);
      alert("Error registering student");
    }
  };

  const handleBulkRegister = async () => {
    if (!csvFile) {
      alert("Please select a CSV file first.");
      return;
    }
    try {
      await registerStudentBulk(csvFile);
      alert("Bulk registration successful!");
      setCsvFile(null);
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      console.error("Bulk registration failed:", error);
      alert("Error during bulk registration");
    }
  };

  const handleDelete = async (sid) => {
    try {
      await deleteStudent(sid);
      toast.success("Student deleted successfully");
      fetchStudents(); // refresh list after deletion
    } catch (error) {
      console.error("Deletion failed", error);
      alert("Error during student deletion");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 text-sm text-gray-800">
      <h2 className="text-lg font-semibold mb-4">
        Manage all Students on your Organization from here
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-64"
        />

        <div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-500 text-white p-2 cursor-pointer"
          >
            Register Student
          </button>
        </div>
      </div>

      {/* View mode toggle */}
      <div className="mb-6 flex items-center gap-4">
        <span className="font-medium text-gray-700">View Mode:</span>
        <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 text-sm font-medium ${
              viewMode === "grid"
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 text-sm font-medium ${
              viewMode === "table"
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Students */}

      {viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, idx) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Phone Number</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.phoneNumber}</td>
                  <td className="p-3 space-x-2">
                    <Link to={`/orgadmin/students/${idx}`}>
                      <button className="text-xs text-blue-600 hover:underline">
                        View Activity
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-xs text-red-600 border border-red-400 rounded px-2 py-1 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Registering New Student */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h3 className="text-lg font-semibold mb-4">
              {isBulk ? "Bulk Student Registration" : "Register New Student"}
            </h3>

            {/* Toggle Buttons */}
            <div className="flex mb-4">
              <button
                className={`flex-1 px-3 py-2 rounded-l-lg border ${
                  !isBulk ? "bg-violet-600 text-white" : "bg-gray-100"
                }`}
                onClick={() => setIsBulk(false)}
              >
                Single
              </button>
              <button
                className={`flex-1 px-3 py-2 rounded-r-lg border ${
                  isBulk ? "bg-violet-600 text-white" : "bg-gray-100"
                }`}
                onClick={() => setIsBulk(true)}
              >
                Bulk
              </button>
            </div>

            {/* Form */}
            {!isBulk ? (
              // Single Registration Form
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg"
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg"
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                  >
                    Register
                  </button>
                </div>
              </form>
            ) : (
              // Bulk Registration Form
              <div className="space-y-4">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files[0])}
                  className="border border-gray-300 w-full px-3 py-2 rounded-lg"
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkRegister}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
