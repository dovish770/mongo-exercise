import UserModel, { User } from '../models/userModel.js';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  
    const {passportId, password} = req.body;

    if(!passportId || !password){
        res.status(400).json({message: "Passport ID and password are required."});
    }

    try{
        const user = await UserModel.findOne({passportId});
        if(!user){
            res.status(404).json({message: "User not found."})
        }
        else{
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                res.status(400).json({message: 'Invalid password'});
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
    
            res.status(200).json({message: "Login successful"});
        }

    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const passportId:string = req.body.passportId;

        const existingUser = await UserModel.findOne({passportId});
        if(existingUser){
            res.status(400).json({message: "User with this Passport ID already exists."});
        }
        const newUser: User = req.body
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

        newUser.password = hashedPassword;

        const addedUser = await UserModel.create(newUser);

        res.status(201).json({ data: addedUser, success: true });
    } catch (error: any) {
        res.status(400).json({ message: error.message, success: false });
    }
};