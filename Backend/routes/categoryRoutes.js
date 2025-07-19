import express from "express";
import { authenticateUser,authorizeAdmin } from "../middlewares/authMiddleware.js"; 
import { createCategory, updateCategory, removeCategory,listCategory,readCategory } from "../controllers/categoryController.js";


const router =express.Router();
router.route('/').post(authenticateUser, authorizeAdmin, createCategory);

router.get('/categories', listCategory);

router.route('/:categoryId')
.put (authenticateUser, authorizeAdmin, updateCategory)
.delete(authenticateUser, authorizeAdmin, removeCategory)
.get(readCategory);  




export default router;