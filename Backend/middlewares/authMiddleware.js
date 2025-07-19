import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

// Middleware to protect routes

export const authenticateUser = asyncHandler(async (req, res, next) => {
    let token;
    //Read token from jwt cookie
    token = req.cookies.token;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);          // Verify the token using the secret key
            req.user = await User.findById(decoded.id).select('-password');    // Find the user by ID and exclude the password field
            next();                                                             // Call the next middleware or route handler
        }catch(error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Middleware to check if the user is an admin
export const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next(); // If the user is an admin, proceed to the next middleware or route handler
    } else {
        res.status(401).send('Not authorized as an admin'); // Forbidden
    }
};
