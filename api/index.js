import express from 'express';
import cors from 'cors';
import usersRoute from './routes/users.js';

const app = express();
app.use(cors());

app.use(express.json());
app.use(cors());

app.use('/', usersRoute);

app.listen(8800, () => {
    console.log("Servidor ON na porta 8800!");
});
