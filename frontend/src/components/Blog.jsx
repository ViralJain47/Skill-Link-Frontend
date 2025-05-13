import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getBlogInfo, updateBlog } from "../features/blog";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import placeholder from "../assets/placeholder.png"

function Blog() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const userId = useSelector((state) => state.auth.userData._id);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const fetchBlogInfo = async () => {
    const res = await getBlogInfo(blogId);
    if (res?.error) toast.error(res.message);
    else setBlog(res);
    setIsOwner(userId == res?.createdBy?._id);
  };

  const handleUpdateBlog = async (blogData) => {
    try {
      const res = await updateBlog(blogData, blogId);
      if (res?.error) console.log(res.error);
      else {
        console.log(res);
        setBlog(res.blog);
        toast.success("Article updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const res = await deleteBlog(blogId);
      if (res?.error) console.log(res.error);
      else {
        toast.success(res.message);
        navigate("/resources");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogInfo();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-20 mx-auto py-10">
        <div className="overflow-hidden rounded-2xl flex flex-col justify-center  items-center w-full gap-10">
          <img
            alt={blog?.title}
            src={ blog?.coverImage ? `${import.meta.env.VITE_API_URL}${blog?.coverImage}`: placeholder}
            className=" w-1/2 h-120 flex justify-center items-center text-3xl"
          />
          <h1 className="px-10 text-5xl font-semibold">{blog?.title}</h1>
          <pre className="px-25 mt-2 text-xl  font-sans leading-8 text-wrap">{blog?.body}</pre>
          <p className="px-25 pb-10 text-2xl font-semibold text-left place-self-start">Created by: {blog?.createdBy?.name}</p>
          {isOwner && (
            <div className="w-1/2 flex gap-10 justify-around">
              <div
                className="bg-amber-300 text-xl w-full px-10 py-3 rounded-full hover:bg-amber-500 cursor-pointer text-center"
                onClick={(e) => {
                  setShowBlogModal(true);
                }}
              >
                Edit
              </div>
              <div
                className="bg-red-400 text-xl w-full px-10 py-3 rounded-full hover:bg-red-600 cursor-pointer text-center"
                onClick={handleDeleteBlog}
              >
                Delete
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-10 px-25">
          <h2 className="text-4xl  text-amber-500 font-semibold">Comments</h2>
          <p>No comments yet...</p>
        </div>
      </div>
      <BlogForm
        isOpen={showBlogModal}
        onClose={() => setShowBlogModal(false)}
        onSubmit={handleUpdateBlog}
        details={blog}
      />
    </>
  );
}

export default Blog;
