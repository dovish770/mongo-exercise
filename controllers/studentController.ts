import UserModel, { User } from '../models/userModel.js';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            res.status(404).json({ message: "User not found", success: false });
        }
        else{
            res.status(200).json({ data: deletedUser, success: true });
        }
        
    } catch (error) {
        res.status(400).json({ message: error, success: false });
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
            new: true, 
            runValidators: true 
        });

        if (!updatedUser) {
            res.status(404).json({ message: "User not found", success: false });
        }
        else{
            res.status(200).json({ data: updatedUser, success: true });
        }

    } catch (error) {
        res.status(400).json({ message: error, success: false });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await UserModel.find(); 
        res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        res.status(400).json({ success: false, message: "Can't get users" });
    }
};