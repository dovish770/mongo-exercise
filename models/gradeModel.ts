import { Schema, Document } from 'mongoose';

export interface Grade extends Document {
    subject: string;
    grade: number;
}

const gradeSchema: Schema<Grade> = new Schema<Grade>({
    subject: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

export default gradeSchema;
