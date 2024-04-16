import { Router } from "express";
import { Login, Signup, VerifyUser, getAllUsers } from "../controllers/user-controller.js";
import {  loginValidator, signupValidator, validate } from "../utils/Validaters.js";
import { verifyToken } from "../utils/token-manager.js";
const Userroute=Router();
Userroute.get("/", getAllUsers);
Userroute.post("/signup", validate(signupValidator),Signup);
Userroute.post("/login", validate(loginValidator),Login);
Userroute.get('/auth-status',verifyToken,VerifyUser)
export default Userroute