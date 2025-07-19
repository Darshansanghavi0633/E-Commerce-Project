import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean,required:true, default: false},
}, {timestamps: true});                     // Automatically manage createdAt and updatedAt fields for users

const User = mongoose.model("User", userSchema); // Create a User model based on the userSchema

export default User; // Export the User model for use in other parts of the application