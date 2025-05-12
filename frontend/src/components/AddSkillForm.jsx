import React, { useEffect, useState } from "react";

const AddSkillForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    approxTotalHours: "",
    type: "Learning", // "Learning" or "Teaching"
    endDate: "1212-12-12",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "approxTotalHours" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const skillData = {
      title: formData.title,
      approxTotalHours: parseFloat(formData.approxTotalHours),
      type: formData.type,
      endDate: formData.endDate,
    };

    onSubmit(skillData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="border-b border-amber-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add New Skill</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
              Skill Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., React Development, Piano, Digital Marketing"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="approxTotalHours"
            >
              Approx. Total Hours
            </label>
            <input
              id="approxTotalHours"
              name="approxTotalHours"
              type="number"
              value={formData.approxTotalHours}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., 150"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Skill Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Learning"
                  checked={formData.type === "Learning"}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                />
                <span className="ml-2 text-gray-700">
                  I want to learn this skill
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="Teaching"
                  checked={formData.type === "Teaching"}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                />
                <span className="ml-2 text-gray-700">
                  I want to teach this skill
                </span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="endDate"
            >
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkillForm;