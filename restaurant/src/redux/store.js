import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/CarteSlice";
import oderReducer from "./slices/oderSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        carte : cartReducer,
        oder : oderReducer
    }
    ,
    devTools: import.meta.env.NODE_ENV !== "production",
})

export default store;