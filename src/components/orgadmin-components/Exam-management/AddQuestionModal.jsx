import React, { useState } from 'react';
import axios from 'axios';
import { addQuestion } from '../../../services/OrgAdminService';

const QUESTION_TYPES = ['MCQ', 'LONG_ANSWER', 'CODING'];

function AddQuestionModal({ onClose }) {
  const [questionType, setQuestionType] = useState('MCQ');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'EASY',
    topic: '',
    createdBy: 1,
    tags: [],
    options: [{ optionText: '', correct: false }],
    codingTestCases: [{ input: '', expectedOutput: '', isSample: false }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionsChange = (index, field, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index][field] = field === 'correct' ? value === 'true' : value;
    setFormData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleTestCasesChange = (index, field, value) => {
    const updatedTestCases = [...formData.codingTestCases];
    updatedTestCases[index][field] = field === 'isSample' ? value === 'true' : value;
    setFormData((prev) => ({ ...prev, codingTestCases: updatedTestCases }));
  };

  const handleSubmit = async () => {
    const payload = { ...formData, type: questionType };
    try {
      //await axios.post('/api/exams/questions', payload);
      await addQuestion(payload);
      alert('Question Added Successfully');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to add question');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-full max-w-2xl space-y-4">
        <h2 className="text-xl font-semibold">Add Question</h2>

        <div>
          <label className="block">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Question Type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {QUESTION_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Conditional Inputs based on Question Type */}
        {questionType === 'MCQ' && (
          <div>
            <h3 className="font-medium mb-2">Options</h3>
            {formData.options.map((opt, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Option Text"
                  value={opt.optionText}
                  onChange={(e) => handleOptionsChange(index, 'optionText', e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <select
                  value={opt.correct.toString()}
                  onChange={(e) => handleOptionsChange(index, 'correct', e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="false">Incorrect</option>
                  <option value="true">Correct</option>
                </select>
              </div>
            ))}
            <button
              onClick={() => setFormData((prev) => ({
                ...prev,
                options: [...prev.options, { optionText: '', correct: false }]
              }))}
              className="text-blue-600 text-sm"
            >
              + Add Option
            </button>
          </div>
        )}

        {questionType === 'CODING' && (
          <div>
            <h3 className="font-medium mb-2">Test Cases</h3>
            {formData.codingTestCases.map((tc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Input"
                  value={tc.input}
                  onChange={(e) => handleTestCasesChange(index, 'input', e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Expected Output"
                  value={tc.expectedOutput}
                  onChange={(e) => handleTestCasesChange(index, 'expectedOutput', e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <select
                  value={tc.isSample.toString()}
                  onChange={(e) => handleTestCasesChange(index, 'isSample', e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="true">Sample</option>
                  <option value="false">Hidden</option>
                </select>
              </div>
            ))}
            <button
              onClick={() => setFormData((prev) => ({
                ...prev,
                codingTestCases: [...prev.codingTestCases, { input: '', expectedOutput: '', isSample: false }]
              }))}
              className="text-blue-600 text-sm"
            >
              + Add Test Case
            </button>
          </div>
        )}

        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={formData.topic}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags.join(',')}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                tags: e.target.value.split(',').map((tag) => tag.trim())
              }))
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-green-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionModal;
