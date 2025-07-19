import path from "path";
import express from "express";
// import formidable from "express-formidable";
// import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";
// import checkId from "../middlewares/checkId.js";
import multer from "multer";

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({    
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const extname= path.extname(file.originalname); // Get the file extension
        const filename = `${file.fieldname}-${Date.now()}${extname}`; // Create a unique filename
        cb(null, filename); // Use the unique filename
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/; // Allowed file types
    const mimetypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/; // Allowed MIME types

    const extname= path.extname(file.originalname).toLowerCase(); // Get the file extension
    const mimetype = file.mimetype; // Get the MIME type of the file

    if (fileTypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Invalid file type. Only JPEG, JPG, PNG, and WEBP files are allowed."), false); // Reject the file
    }
};

const upload = multer({
    storage: storage, // Use the defined storage
    fileFilter: fileFilter, // Use the defined file filter
    // limits: { fileSize: 5 * 1024 * 1024 } // Set file size limit to 5MB
});

const uploadSingleImage = upload.single("image"); // Specify the field name for single file upload

router.post("/",(req,res)=>{
    // res.send("File uploaded successfully"); 
    uploadSingleImage(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message }); // Handle file upload errors
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" }); // Handle case where no file is uploaded
        }
        res.status(200).json({ 
            message: "File uploaded successfully", 
            image: `/${req.file.path}`, // Return the path of the uploaded file
        });
    });
});

export default router;