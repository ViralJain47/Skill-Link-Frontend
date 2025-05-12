import axios from "axios";

const getAllSkills = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/skill/all`);
    return response.data;

  } catch (error) {
    console.log(error);
    return {error: true, message: error};
  }
};

const getSkill = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/skill`);
    return response.data;

  } catch (error) {
    console.log(error);
    return {error: true, message: error};
  }
};

const createSkill = async () => {

};

const updateSkill = async () => {

};

const deleteSkill = async () => {

};

export { getAllSkills, getSkill, createSkill, updateSkill, deleteSkill };
