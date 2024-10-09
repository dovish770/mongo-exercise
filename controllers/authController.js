var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { passportId, password } = req.body;
    if (!passportId || !password) {
        res.status(400).json({ message: "Passport ID and password are required." });
    }
    try {
        const user = yield UserModel.findOne({ passportId });
        if (!user) {
            res.status(404).json({ message: "User not found." });
        }
        else {
            const isPasswordValid = yield bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: 'Invalid password' });
            }
            // const token = jwt.sign(
            //     {id: user._id, role: user.role},
            //     process.env.JWT_SECRET!,
            //     {expiresIn: '1h'}
            // );
            // res.cookie('auth_token', token, {
            //     httpOnly: true, 
            //     secure: process.env.NODE_ENV === 'production', 
            //     sameSite: 'strict', 
            //     maxAge: 3600000 
            // });
            res.status(200).json({ message: "Login successful" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passportId = req.body.passportId;
        const existingUser = yield UserModel.findOne({ passportId });
        if (existingUser) {
            res.status(400).json({ message: "User with this Passport ID already exists." });
        }
        const newUser = req.body;
        const saltRounds = 10;
        const hashedPassword = yield bcrypt.hash(newUser.password, saltRounds);
        newUser.password = hashedPassword;
        const addedUser = yield UserModel.create(newUser);
        res.status(201).json({ data: addedUser, success: true });
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});
