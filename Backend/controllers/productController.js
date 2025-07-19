import asyncHandler from "../middlewares/asyncHandler.js";
import Product from  "../models/productModel.js"

export const addProduct = asyncHandler(async(req,res)=>{
    try{
        const {name ,description,price ,category,quantity,brand} = req.fields;         // Extracting fields from the request(formidable middleware)
        // console.log(name, description, price, category, quantity, brand);
        // Validation of required fields
        switch(true){
            case !name:
                throw new Error("Product name is required");
            case !description:
                throw new Error("Product description is required");
            case !price:
                throw new Error("Product price is required");
            case !category:
                throw new Error("Product category is required");
            case !quantity:
                throw new Error("Product quantity is required");
            case !brand:
                throw new Error("Product brand is required");
        }
        // Creating a new product instance
        const product = new Product({...req.fields}); // Using formidable to handle file uploads
        const createdProduct = await product.save(); // Saving the product to the database
        res.status(201).json(createdProduct); // Responding with the created product
    }catch(error){
        console.error(error);
        res.status(400).json({message: error.message});
    }
})


export const updateProductDetails = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params; // Extracting product ID from request parameters
        const {name, description, price, category, quantity, brand} = req.fields; // Extracting fields from the request
        // Validation of required fields
        switch(true){
            case !name:
                throw new Error("Product name is required");
            case !description:
                throw new Error("Product description is required");
            case !price:
                throw new Error("Product price is required");
            case !category:
                throw new Error("Product category is required");
            case !quantity:
                throw new Error("Product quantity is required");
            case !brand:
                throw new Error("Product brand is required");
        }
        // Finding the product by ID and updating it
        const updatedProduct = await Product.findByIdAndUpdate(id, {...req.fields}, {new: true});
        await updatedProduct.save(); // Saving the updated product    
        res.status(200).json(updatedProduct); // Responding with the updated product
    }catch(error){
        console.error(error);
        res.status(400).json({message: error.message});
    }
})

export const removeProduct = asyncHandler(async(req,res)=>{ 
    try {
        const product =await Product.findByIdAndDelete(req.params.id)
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(400).json({message:error.message});
    }
})


export const fetchProducts = asyncHandler(async(req,res)=>{
    try {

        const pageSize=6
        const keywords = req.query.keywords?{name:{$regex:req.query.keywords,$options:"i"}}:{};
        const count = await Product.countDocuments({...keywords}); // Counting total products matching the keywords

        const products = await Product.find({...keywords}).limit(pageSize); // Fetching all products from the database
        res.json({products,page:1,pages:Math.ceil(count/pageSize),hasMore:false}); // Responding with the list of products
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
})

export const fetchProductById = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id); // Finding a product by its ID
        if (!product) {
            res.status(404).json({message: "Product not found"}); // Responding with an error if the product is not found
        } else {
            res.json(product); // Responding with the found product
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message}); // Responding with an error message if an exception occurs
    }
})