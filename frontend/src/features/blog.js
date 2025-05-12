import axios from "axios"

const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/all`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {error: true, messge: error};
  }
}

const getBlogInfo = async (blogId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/${blogId}`);
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
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {error: true, messge: error};
  }
}

const updateBlog = async (blogData, blogId) => {
  try {
    console.log({blogId}, blogData);
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/blog/update/${blogId}`, blogData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {error: true, message: error};
  }
}

const deleteBlog = async (blogId) => {
  try {
    const resonse = await axios.delete(`${import.meta.env.VITE_API_URL}/api/blog/delete/${blogId}`);
    return resonse.data;
  } catch (error) {
    console.log({error});
    return {error: true, message: error};
  }
}

export {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogInfo
}