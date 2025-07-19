import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")? 
    JSON.parse(localStorage.getItem("userInfo"))
    :null,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log("Setting user info in state:", action.payload);
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
            const expirationTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
            localStorage.setItem("expirationTime", expirationTime.toISOString());
            console.log("User info set in localStorage:", state.userInfo);
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        }
        
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;