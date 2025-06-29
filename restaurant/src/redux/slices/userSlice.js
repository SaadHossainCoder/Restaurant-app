import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    isLoggedIn: false
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser: (state, action) => {
            const { _id, username, email, phone, role } = action.payload;
            state._id = _id
            state.username = username
            state.email = email
            state.phone = phone
            state.role = role
            state.isLoggedIn = true
        },

        removeUser: (state) => {
            state._id = ""
            state.username = ""
            state.email = ""
            state.phone = ""
            state.role = ""
            state.isLoggedIn = false
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;   