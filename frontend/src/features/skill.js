import axios from "axios";

const getAllUserSkills = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/skill/user/${userId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

const getSkill = async (skillId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/skill/skills/${skillId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

const createSkill = async (skillData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/skill/create`,
      skillData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

const updateSkill = async (skillData, skillId) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/skill/update/${skillId}`,
      skillData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

const deleteSkill = async (skillId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/skill/delete/${skillId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error };
  }
};

export { getAllUserSkills, getSkill, createSkill, updateSkill, deleteSkill };
