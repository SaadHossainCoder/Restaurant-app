import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
const loadCartFromStorage = () => {
    try {
        const data = localStorage.getItem('my_cart');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Failed to load cart from localStorage", err);
        return [];
    }
};

// Save to localStorage
const saveCartToStorage = (items) => {
    try {
        localStorage.setItem('my_cart', JSON.stringify(items));
    } catch (err) {
        console.error("Failed to save cart to localStorage", err);
    }
};

const initialState = {
    items: loadCartFromStorage(),
};

const carteSlice = createSlice({
    name: 'carte',
    initialState,
    reducers: {
        addItemToCarte: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                const newItem = {
                    ...action.payload,
                    quantity: action.payload.quantity || 1,
                    totalPrice: (action.payload.price || 0) * (action.payload.quantity || 1),
                };
                state.items.push(newItem);
            }
            saveCartToStorage(state.items); // Save after adding
        },

        removeItemFromCarte: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            saveCartToStorage(state.items); // Save after removing
        },

        updateItemInCarte: (state, action) => {
            const { _id, quantity } = action.payload;
            const item = state.items.find(item => item._id === _id);
            if (item) {
                item.quantity = quantity;
                item.totalPrice = item.price * quantity;
            }
            saveCartToStorage(state.items); // Save after update
        },

        clearCarte: (state) => {
            state.items = [];
            localStorage.removeItem('my_cart'); // Clear from storage too
        },
    },
});

export const {
    addItemToCarte,
    removeItemFromCarte,
    updateItemInCarte,
    clearCarte
} = carteSlice.actions;

export default carteSlice.reducer;
