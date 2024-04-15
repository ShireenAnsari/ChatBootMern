import { Router } from "express";
import { Login, Signup, getAllUsers } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/Validaters.js";
const Userroute = Router();
Userroute.get("/", getAllUsers);
Userroute.post("/signup", validate(signupValidator), Signup);
Userroute.post("/login", validate(loginValidator), Login);
export default Userroute;
//# sourceMappingURL=user-route.js.map