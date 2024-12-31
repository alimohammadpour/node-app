import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

export const createUserModel = async ({ name, email, password }) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error('User with this email already exists. Try to login with your credentials!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new User({ name, email, password: hashedPassword });
    await userModel.save();

    return userModel;
};

export const getUserProgress = async (id) => {
    const { progress } = await User.findById(id);
    return progress;
};