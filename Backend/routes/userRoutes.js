import express from 'express';
import { createUser,loginUser,logoutUser,getAllUsers, getCurrentUserProfile,
updateCurrentUserProfile,deleteUserById, getUserById, updateUserById} from '../controllers/userController.js';

import { authenticateUser, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
.post(createUser)
.get(authenticateUser, authorizeAdmin, getAllUsers);

router.post('/auth', loginUser);
router.post('/logout', logoutUser);

router.route('/profile')
.get(authenticateUser, getCurrentUserProfile)
.put(authenticateUser, updateCurrentUserProfile);

//Admin Routes
router.route('/:id')
.delete(authenticateUser, authorizeAdmin,deleteUserById)
.get(authenticateUser, authorizeAdmin, getUserById)
.put(authenticateUser, authorizeAdmin, updateUserById); 
export default router;