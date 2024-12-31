import { createUserModel, getUserProgress } from '../services/userService.js';

export const createUser = async ({body : { name, email, password }}, res) => {
    try {
        const { id } = await createUserModel({ name, email, password });
        res.status(201).json({ message: 'User created successfully.', id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProgress = async ({ params: { id } }, res) => {
    try {
        const progress = await getUserProgress(id);
        res.status(200).json({ progress });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};