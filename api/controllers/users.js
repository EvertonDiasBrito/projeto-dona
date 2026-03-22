import {db} from '../db.js';

export const getOneUser = (req, res) => {
    // O req.params.id apanha o valor que vem na URL (ex: /users/5)
    const q = "SELECT * FROM dona_clientes WHERE id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        // Se encontrar, data será um array com 1 item: [ {id: 5, nome: "..."} ]
        // Retornamos apenas o primeiro objeto
        if (data.length === 0) return res.status(404).json("Cliente não encontrado");

        return res.status(200).json(data[0]);
    });
};

export const getUsers = (req, res) => {
    const q = "SELECT * FROM dona_clientes";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    }); 
};

export const addUser = (req, res) => {
    
    const q = "INSERT INTO dona_clientes(`cliente`, `fone`, `morada`) VALUES(?)";

    const values = [
        req.body.cliente,
        req.body.fone,
        req.body.morada,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json(err);

        return res.status(201).json("Cliente criado com sucesso.");
    });
};