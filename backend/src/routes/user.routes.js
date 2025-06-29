import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    getAllUsers,
    deleteUser
} from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser, verifyJWT);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/all-users").get(verifyJWT, getAllUsers);
router.route("/delete/t/:id").delete(verifyJWT, deleteUser);


export default router;