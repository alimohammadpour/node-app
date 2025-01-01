import { Schema, model } from "mongoose";
import { UserProgressEnum } from "../enums/UserProgressEnum.js";

const userProgressSchema = new Schema({
    level: { 
        type: Number, 
        required: true, 
        default: UserProgressEnum.level
    },
    completion: { 
        type: String, 
        required: true, 
        default: UserProgressEnum.completion
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
        default: UserProgressEnum,
    },
}, { timestamps: true });
  
export const User = model('User', userSchema);