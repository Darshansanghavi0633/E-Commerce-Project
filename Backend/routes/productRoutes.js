import express from "express";
import formidable from "express-formidable";
import { authenticateUser,authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js"
import { addProduct,updateProductDetails,removeProduct,fetchProducts,fetchProductById } from "../controllers/productController.js";

const router=express.Router();

router.route('/')
.get(fetchProducts) // Assuming fetchProducts is defined elsewhere
.post(authenticateUser,authorizeAdmin,formidable(),addProduct);
router.route('/:id')
.get(fetchProductById)
.put(authenticateUser,authorizeAdmin,checkId,formidable(),updateProductDetails)
.delete(authenticateUser,authorizeAdmin,checkId,removeProduct);




export default router;