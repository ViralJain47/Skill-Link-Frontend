import axios from "axios";

const getAllSessions = async() => {
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL/api/session/all);
        return res.data;
    } catch (error) {
        console.log("error in getting all sessions : ",error);
    }
}

const createSession = async(sessionData) => {
    try {
        const res = await axios.post(import.meta.env.VITE_API_URL/api/session/create, sessionData,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        );
        return res.data;
    } catch (error) {
        console.log("error while creating the session : ", error);
    }
}

const updateSession = async(sessionData, sessionId) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/session/update/${sessionId}`,sessionData,{
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        });

        return res.data;
    } catch (error) {
        console.log("error in updating the session :", error)
    }
}

const getSessionDetails = async(sessionId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/session/${sessionId}`)
        return res.data;
    } catch (error) {
        console.log("error while getting the details of session : ",error);
    }
}

const deleteSession = async(sessionId) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/session/delete/${sessionId}`)
        return res.data;
    } catch (error) {
        console.log("error in deleting the session : ", error);
    }
}


export {createSession, updateSession, deleteSession, getSessionDetails, getAllSessions};