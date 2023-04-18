import express from 'express';
import { getUserData, loginUser, registerUser } from '../controllers/users.js';


const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser)
userRoutes.get('/:id', getUserData)

export default userRoutes;