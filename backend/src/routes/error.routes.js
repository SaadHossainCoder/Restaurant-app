import { Router } from "express";

import {
    createError,
    getErrors,
    deleteError
} from "../controller/error.controller.js";

const router = Router();

router.route("/")
    .post(createError)
    .get(getErrors);

router.route("/t/:id")
    .delete(deleteError);


export default router;