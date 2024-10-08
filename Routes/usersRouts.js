import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController.js';
const router = express.Router();
router.route('/').get(getUsers).post(createUser);
router.route('/:id').delete(deleteUser).put(updateUser);
export default router;
