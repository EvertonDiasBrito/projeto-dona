import express from 'express';
import { getUsers, getOneUser ,addUser, deleteUser, updateUser} from '../controllers/users.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/clientes/:id', getOneUser);
router.get('/users/:id', getOneUser);


export default router;