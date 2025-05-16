import axios from "axios";

const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/user/all`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

const getUser = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

const connectRequest = async (receiverId, senderId, senderName) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/connect/${receiverId}`,
      { senderId, senderName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

const changeConnectionRequest = async (senderId, receiverId, res) => {
  try {
    console.log({senderId, receiverId, res});
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/connectRequest/${receiverId}`,
      { senderId, response: res },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

export { getAllUsers, getUser, connectRequest, changeConnectionRequest };
