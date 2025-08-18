// packages
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// utils
import connectDB from "./config/db.js";

// Set the port from environment variables or default to 5000
const port = process.env.PORT || 5000;

dotenv.config();            // Load environment variables from .env file to process.env
connectDB();                // Establish a connection to the MongoDB database
const app = express();      // Create an instance of the Express application

app.use(express.json());                                // Parse incoming JSON requests to req.body
app.use(express.urlencoded({ extended: true }));        // Parse incoming URL-encoded requests to req.body
app.use(cookieParser());                                // Parse cookies from incoming requests to req.cookies

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products",productRoutes);
app.use("/api/uploads",uploadRoutes);
app.use("/api/orders", orderRoutes);

const __dirname = path.resolve(); // Get the current directory path
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // Serve static filess from the uploads directory 

app.listen(port, () => {        
    console.log(`Server is running on port ${port}`);   // Log the server's listening port
});