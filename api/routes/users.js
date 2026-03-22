import express from 'express';
import { getUsers, getOneUser} from '../controllers/users.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/:id', getOneUser);

export default router;