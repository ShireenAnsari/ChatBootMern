import { Router } from "express";
import { Login, Signup, getAllUsers } from "../controllers/user-controller.js";
import { Loginvalidater, signUpvalidater, validate } from "../utils/Validaters.js";
const Userroute=Router();
Userroute.get('/',getAllUsers);

Userroute.post('/signup',validate(signUpvalidater), Signup);
Userroute.post('/login',validate(Loginvalidater),Login)
export default Userroute