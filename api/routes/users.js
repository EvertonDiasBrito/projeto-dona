import express from 'express';
import { getUsers, getOneUser ,addUser} from '../controllers/users.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/:id', getOneUser);
router.post('/users', addUser);

export default router;