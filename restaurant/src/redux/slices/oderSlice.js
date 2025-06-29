import { createSlice } from "@reduxjs/toolkit"; 

// Load from localStorage
const loadCartFromStorage = () => {
    try {
        const data = localStorage.getItem('my_oder');
        return data ? JSON.parse(data) : "";
    } catch (err) {
        console.error("Failed to load cart from localStorage", err);
        return "";
    }
};

// Save to localStorage
const saveCartToStorage = (items) => {
    try {
        localStorage.setItem('my_oder', JSON.stringify(items));
    } catch (err) {
        console.error("Failed to save cart to localStorage", err);
    }
};

const initialState = {
    code: loadCartFromStorage()
};

const oderSlice = createSlice({
    name: 'oder',
    initialState,
    reducers: {
        addOder: (state, action) => {
            const { code } = action.payload;
            if (!code || code.length === 0) return;
            state.code = code;
            saveCartToStorage(state.code);
        },

        removeOder: (state) => {
            state.code = "";
            localStorage.removeItem("my_oder");
        }
    },
});

export const {
    addOder,
    removeOder,
} = oderSlice.actions;

export default oderSlice.reducer;