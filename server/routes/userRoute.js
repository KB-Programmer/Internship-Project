import express from 'express'
import { Register } from '../controllers/UserController.js'
const userRoute = express.Router();

userRoute.post('/register', Register)

export default userRoute;