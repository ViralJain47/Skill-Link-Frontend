import axios from "axios"

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/all`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {error: true, message: error};
  }
}

const getUser = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {error: true, message: error};
  }
}

export {
  getAllUsers,
  getUser
}