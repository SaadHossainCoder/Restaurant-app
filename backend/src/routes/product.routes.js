// routes/product.routes.js
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controller/product.controller.js";

const router = Router();

router
    .route("/")
    .post(createProduct, verifyJWT)
    .get(getAllProducts)

router
    .route("/t/:id")
    .get(getProductById)
    .put(updateProduct, verifyJWT)
    .delete(deleteProduct, verifyJWT);

export default router;
