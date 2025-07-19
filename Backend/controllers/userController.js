import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/createToken.js';


//Create a new user
export const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    //console.log(`Creating user with data: ${ username}, ${email}, ${password}`);
    if(!username || !email || !password) {
        throw new Error('Please fill all the fields');
    }

    const userExists = await User.findOne({ email });
    if(userExists) res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser= new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        // Generate a token for the new user
        const token = generateToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});


//Login a user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //console.log(`Logging in user with email: ${email}`);
    if(!email || !password) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const existingUser  = await User.findOne({ email });
    if(!existingUser) {
        res.status(401);
        throw new Error('Invalid email');
    }
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordMatch) {
        res.status(401);
        throw new Error('Invalid password');
    }
    // Generate a token for the user
    const token = generateToken(res, existingUser._id);
    res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
    });

})


//Logout a user
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ message: 'Logged out' });
});


//Get all users (Admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password'); // Exclude password field from the response
    res.status(200).json(users);
});

// This function retrieves the profile of the currently logged-in user
export const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); 
    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }else {
        res.status(404);
        throw new Error('User not found');
    }
    
});

// This function allows the user to update their profile information
export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    // const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators: true});
    const user= await User.findById(req.user._id);
    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;  
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Delete a user by ID (Admin only)
export const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password field from the response     
    if(user) {
        if(user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await user.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Get a user by ID (Admin only)
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password field from the response
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Update a user by ID (Admin only)
export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});