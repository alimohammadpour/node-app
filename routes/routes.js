import express from 'express';
import { createUser, getProgress } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', createUser);
router.get('/user/:id/progress', getProgress);

export default router;