import React, { useEffect, useState } from "react";

const BlogForm = ({ isOpen, onClose, onSubmit, details }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
  });

  useEffect(() => {
    if (details?.title && isOpen) {
      setFormData(details);
    }
  }, [isOpen]);

  const [coverImage, setCoverImage] = useState({});

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("coverImage", coverImage);
    form.append("title", formData.title);
    form.append("body", formData.body);
    form.append("category", formData.category);


    onSubmit(form);
    setFormData((prev) => ({
      title: "",
      body: "",
      category: "",
    }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="border-b border-amber-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Create New Blog</h2>
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
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
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
              Content
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  body: e.target.value,
                }));
              }}
              required
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Your content goes here..."
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="title"
            >
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              required={!details?.title}
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="title"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }));
              }}
              required
              className="w-full px-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g., Web Development, Android Development, etc."
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
              {details?.title ? "Update Article" : "Add Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
