import { Schema } from 'mongoose';
const gradeSchema = new Schema({
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
