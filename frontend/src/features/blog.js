import axios from "axios"

const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/all`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return {error: true, messge: error};
  }
}

const createBlog = async (blogData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/create`, blogData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return {error: true, messge: error};
  }
}

const updateBlog = async (blogData, blogId) => {

}

const deleteBlog = async (blogId) => {

}

export {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
}