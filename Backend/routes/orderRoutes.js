import express from "express";
import  {authenticateUser,authorizeAdmin} from "../middlewares/authMiddleware.js";
import { createOrder } from './../controllers/orderController.js';
const router = express.Router();

router.route("/").post(authenticateUser,createOrder);

export default router;