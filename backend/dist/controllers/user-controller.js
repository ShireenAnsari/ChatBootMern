import UserModels from "../models/User-models.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const user = await UserModels.find().select('-password');
        return res.status(201).json({ message: 'ok', user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
};
export const Signup = async (req, res, next) => {
    try {
        // user signup
        const { name, email, password } = req.body;
        const existingUser = await UserModels.findOne({ email });
        console.log(existingUser);
        if (existingUser)
            return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10);
        const user = new UserModels({ name, email, password: hashedPassword });
        await user.save();
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            path: '/',
            domain: 'localhost',
            signed: true
        });
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: 'ok', id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
};
export const Login = async (req, res, next) => {
    try {
        // user login
        const { email, password } = req.body;
        const user = await UserModels.findOne({ email });
        if (!user) {
            return res.status(401).send('User not found');
        }
        const isPasswordcorrect = await compare(password, user.password);
        if (!isPasswordcorrect) {
            return res.status(403).send('Incorrect password');
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            path: '/',
            domain: 'localhost',
            signed: true
        });
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: 'ok', id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map