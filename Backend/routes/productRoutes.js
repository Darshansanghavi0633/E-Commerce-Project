import express from "express";
import formidable from "express-formidable";
import { authenticateUser,authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js"
import { 
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts
} from "../controllers/productController.js";

const router=express.Router();

router.route('/')
.get(fetchProducts)
.post(authenticateUser,authorizeAdmin,formidable(),addProduct);

router.route('/allproducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authenticateUser,checkId,addProductReview);
router.route('/top').get(fetchTopProducts); 
router.route('/new').get(fetchNewProducts);

router.route('/:id')
.get(fetchProductById)
.put(authenticateUser,authorizeAdmin,formidable(),updateProductDetails)
.delete(authenticateUser,authorizeAdmin,checkId,removeProduct);

router.route('/filtered-products').post(filterProducts);



export default router;