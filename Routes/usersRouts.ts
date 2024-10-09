import express from 'express';
import {deleteStudent, updateStudent, getUsers} from '../controllers/studentController.js'

const router = express.Router();

router.get('/', getUsers)
router.route('/:id').delete(deleteStudent).put(updateStudent);

export default router;