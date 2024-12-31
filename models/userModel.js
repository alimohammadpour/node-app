import { Schema, model } from "mongoose";

const userProgressSchema = new Schema({
    level: { 
        type: Number, 
        required: true, 
        default: 1 
    },
    completion: { 
        type: String, 
        required: true, 
        default: '10%'
    },
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    progress: {
        type: userProgressSchema,
        required: true,
        default: { level: 1, completion: '10%' },
    },
}, { timestamps: true });
  
export const User = model('User', userSchema);