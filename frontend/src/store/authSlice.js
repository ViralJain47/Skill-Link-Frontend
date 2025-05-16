import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData:null,
    firstConversations: true,
    onlineUsers : []
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login: (state, action) =>{
            state.status = true;
            state.userData = action.payload;
        },

        logout:(state) =>{
            state.status = false;
            state.userData = null;
        }
        ,

        setFirstConversations: (state) => {
            state.firstConversations = false
        },

        addOnlineUsers: (state,action) => {
            const newUser = action.payload;
            state.onlineUsers = Array.from(new Set([...state.onlineUsers, newUser]));
        },
        
        removeOfflineUsers: (state,action) => {
            const userId = action.payload;
            state.onlineUsers = state.onlineUsers.filter(user => user != userId);
        },

        addMultipleOnlineUsers: (state, action) => {
            state.onlineUsers = Array.from(new Set([...state.onlineUsers, ...action.payload]))
        },
    }
})


export const {login, logout, setFirstConversations, addOnlineUsers, removeOfflineUsers, addMultipleOnlineUsers} = authSlice.actions;
export default authSlice.reducer;