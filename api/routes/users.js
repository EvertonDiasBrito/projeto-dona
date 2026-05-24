import express from 'express';
import { getUsers, getOneUser ,addUser, deleteUser, updateUser} from '../controllers/users.js';


import { getServicosHoje, addServico, updateStatusServico, deleteServico } from '../controllers/servicos.js';

const router = express.Router();

// Rotas de Clientes / Utilizadores
router.get('/users', getUsers);
router.post('/users', addUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/clientes/:id', getOneUser);
router.get('/users/:id', getOneUser);

// Rotas de Serviços
router.get('/servicos/hoje', getServicosHoje);
router.post('/servicos', addServico);
router.patch('/servicos/:id/status', updateStatusServico);
router.delete('/servicos/:id', deleteServico);

export default router;
