import axios from "axios";

const defaultHeader = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const axiosWrapper = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: { ...defaultHeader },
});

//api User
export const login = (data) => axiosWrapper.post("/api/v1/users/login", data);
export const register = (data) => axiosWrapper.post("/api/v1/users/register", data);
export const logout = () => axiosWrapper.post("/api/v1/users/logout");
export const getUserData = () => axiosWrapper.get("/api/v1/users/current-user", { withCredentials: true });
export const allUsers = () => axiosWrapper.get("/api/v1/users/all-users", { withCredentials: true });
export const deleteUser = (id) => axiosWrapper.delete(`/api/v1/users/delete/t/${id}`, { withCredentials: true });

//api order
export const createOrder = (data) => axiosWrapper.post("/api/v1/orders/create-order", data, { withCredentials: true });
export const getAllOrders = () => axiosWrapper.get("/api/v1/orders/all-orders", { withCredentials: true });
export const getOrderById = (id) => axiosWrapper.get(`/api/v1/orders/get-order/${id}`, { withCredentials: true });
export const updateOrderStatus = (id, status) => axiosWrapper.put(`/api/v1/orders/update-order/${id}`, { status }, { withCredentials: true });
export const deleteOrder = (id) => axiosWrapper.delete(`/api/v1/orders/delete-order/${id}`, { withCredentials: true });

//api product
export const createProduct = (data) => axiosWrapper.post("/api/v1/products/", data, { withCredentials: true });
export const getAllProducts = () => axiosWrapper.get("/api/v1/products/", { withCredentials: true });
export const getProductById = (id) => axiosWrapper.get(`/api/v1/products/t/${id}`, { withCredentials: true });
export const updateProduct = (id, data) => axiosWrapper.put(`/api/v1/products/update-product/${id}`, data, { withCredentials: true });
export const deleteProduct = (id) => axiosWrapper.delete(`/api/v1/products/t/${id}`, { withCredentials: true });

//api error
export const createError = (data) => axiosWrapper.post("/api/v1/errors/create-error", data, { withCredentials: true });
export const getErrors = () => axiosWrapper.get("/api/v1/errors/all-errors", { withCredentials: true });
export const deleteError = (id) => axiosWrapper.delete(`/api/v1/errors/delete-error/${id}`, { withCredentials: true });

