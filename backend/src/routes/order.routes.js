import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from "../controller/order.controller.js";

const router = Router();

router.route("/")
    .post(createOrder)
    .get(getAllOrders);

router.route("/t/:id")
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder, verifyJWT);


export default router;