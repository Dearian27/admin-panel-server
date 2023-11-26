import express from 'express';
import { getUsers, deleteUser, checkUser } from '../controllers/users.js';
import { verifyToken } from '../controllers/verifyToken.js';

const router = express.Router();
router.get('/', verifyToken, getUsers);
router.delete('/:id', verifyToken, deleteUser);
router.get('/check', verifyToken, checkUser);

export default router;
