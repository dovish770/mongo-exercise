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
export const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const deletedUser = yield UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found", success: false });
        }
        else {
            res.status(200).json({ data: deletedUser, success: true });
        }
    }
    catch (error) {
        res.status(400).json({ message: error, success: false });
    }
});
export const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const updatedUser = yield UserModel.findByIdAndUpdate(userId, updatedData, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found", success: false });
        }
        else {
            res.status(200).json({ data: updatedUser, success: true });
        }
    }
    catch (error) {
        res.status(400).json({ message: error, success: false });
    }
});
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield UserModel.find();
        res.status(200).json({ success: true, data: allUsers });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Can't get users" });
    }
});
