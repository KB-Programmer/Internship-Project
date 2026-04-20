import express from 'express'
import { deleteAccount, editAccount, Login, Register, selectAccount } from '../controllers/UserController.js'
const userRoute = express.Router();

userRoute.post('/register', Register)
userRoute.post('/login', Login)
userRoute.post('/account', selectAccount)
userRoute.post("/editaccount", editAccount);
userRoute.post("/deleteaccount", deleteAccount);

export default userRoute;