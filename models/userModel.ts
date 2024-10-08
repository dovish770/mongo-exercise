import { Schema, model, Document } from 'mongoose';
import { Role } from './roleModel.js';
import gradeSchema, { Grade } from './gradeModel.js';

export interface User extends Document {
    fullName: string;
    passportId: string;
    password: string;
    role: Role;
    grades: Grade[];
}

const userSchema: Schema<User> = new Schema<User>({
    fullName: {
        type: String,
        required: [true, "please enter name"],
        maxLength: [35, "name too long"],
        trim: true
    },
    passportId: {
        type: String,
        required: [true, "please enter passport id"],
        minLength: [9, "passport id must be 9 digits"],
        maxLength: [9, "passport id must be 9 digits"]
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minLength: [8, "password must be at least 8 characters"]
    },
    role: {
        type: String,
        enum: Object.values(Role),
        required: true
    },
    grades: {
        type: [gradeSchema],
        default: []
    }
});


const UserModel = model<User>('User', userSchema);

export default UserModel;
