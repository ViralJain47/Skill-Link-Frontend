import React, { useEffect, useState } from "react";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "../features/blog";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const Resources = () => {
  const [blogs, setBlogs] = useState([]);

  const userId = useSelector((state) => state.auth.userData._id);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const fetchAllBlogs = async () => {
    try {
      const res = await getAllBlogs();
      if (res.error) toast.error(error);
      else setBlogs(res);
    } catch (error) {
      console.log(error);
    }
  };

  const myBlogs = blogs.filter((blog) => blog.createdBy._id == userId);

  const handleAddBlog = async (blogData) => {
    try {
      blogData.append("createdBy", userId);
      const res = await createBlog(blogData);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <>
        <>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Learning Articles
              </h1>
              <button
                onClick={() => {
                  setShowBlogModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-md hover:from-amber-600 hover:to-orange-700 shadow-md transition duration-300"
              >
                Submit Article
              </button>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="border border-amber-100 rounded-xl overflow-hidden hover:shadow-md transition duration-300 hover:scale-102"
                >
                  <div className="relative">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${blog.coverImage}`}
                      alt={blog.title}
                      className="w-200 h-70 object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-amber-800 line-clamp-2">
                        {blog.title}
                      </h3>
                    </div>

                    <div className="flex justify-between mt-2 items-center">
                      <span className="text-gray-600 text-sm">
                        By {blog.createdBy.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {blog.createdAt.slice(0, 10)}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                        {blog.category}
                      </span>
                      <Link to={`/blog/${blog._id}`}>
                        <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                          Read
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="text-center py-10">
                <div className="text-amber-500 text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-700">
                  No articles found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Your Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="border border-amber-100 rounded-xl overflow-hidden hover:shadow-md transition duration-300 hover:scale-102"
                  >
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_API_URL}${
                          blog.coverImage
                        }`}
                        alt={blog.title}
                        className="w-200 h-70 object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-amber-800 line-clamp-2">
                          {blog.title}
                        </h3>
                      </div>

                      <div className="flex justify-between mt-2 items-center">
                        <span className="text-gray-600 text-sm">
                          By {blog.createdBy.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {blog.createdAt.slice(0, 10)}
                        </span>
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                          {blog.category}
                        </span>
                        <Link to={`/blog/${blog._id}`}>
                          <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-md hover:from-amber-600 hover:to-orange-700 shadow-sm transition duration-300">
                            Read
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Article Collections */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Featured Article Collections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition duration-300">
                  <h3 className="font-medium text-amber-800">
                    Web Development Fundamentals
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Essential articles for modern web development
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-600">8 articles</span>
                    <button className="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md hover:bg-amber-50 transition duration-300">
                      View Collection
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition duration-300">
                  <h3 className="font-medium text-rose-800">
                    UI/UX Design Principles
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Articles on design thinking and best practices
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-600">6 articles</span>
                    <button className="px-3 py-1 border border-rose-500 text-rose-600 text-sm rounded-md hover:bg-rose-50 transition duration-300">
                      View Collection
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition duration-300">
                  <h3 className="font-medium text-blue-800">
                    Data Science Insights
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Deep dives into data analysis techniques
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-600">7 articles</span>
                    <button className="px-3 py-1 border border-blue-500 text-blue-600 text-sm rounded-md hover:bg-blue-50 transition duration-300">
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Authors */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Popular Authors
              </h2>
              <div className="flex flex-wrap gap-4">
                {[
                  "Alex Chen",
                  "Priya Sharma",
                  "Miguel Santos",
                  "Viral Jain",
                  "Vansh Dubey",
                ].map((author, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-amber-50 rounded-full px-4 py-2 border border-amber-200 hover:bg-amber-100 transition duration-300"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold mr-2">
                      {author.charAt(0)}
                    </div>
                    <span className="text-amber-800">{author}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="mt-4 text-amber-600 font-medium hover:text-amber-800 flex items-center mx-auto">
                Browse all articles <span className="ml-1">→</span>
              </button>
            </div>
          </div>
          <BlogForm
            isOpen={showBlogModal}
            onClose={() => setShowBlogModal(false)}
            onSubmit={handleAddBlog}
          />
        </>
    </>
  );
};

export default Resources;
