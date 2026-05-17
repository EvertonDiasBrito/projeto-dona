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
    
    const q = "INSERT INTO dona_clientes(`Cliente`, `Fone`, `Morada`) VALUES(?)";

    const values = [
        req.body.Cliente,
        req.body.Fone,
        req.body.Morada,
    ];

    db.query(q, [values], (err, result) => {
        if (err) return res.status(500).json(err);

         return res.status(201).json({ 
            id: result.insertId, 
            Cliente: req.body.Cliente, 
            Fone: req.body.Fone, 
            Morada: req.body.Morada 
        });
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM dona_clientes WHERE id = ?";

    db.query(q, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json("Cliente não encontrado.");
        }

        return res.status(200).json("Cliente eliminado com sucesso.");
    });
};

export const updateUser = (req, res) => {
    const q = "UPDATE dona_clientes SET `Cliente` = ?, `Fone` = ?, `Morada` = ? WHERE id = ?";

    const values = [
        req.body.Cliente || req.body.cliente,
        req.body.Fone || req.body.fone,
        req.body.Morada || req.body.morada,
        req.params.id
    ];

    db.query(q, values, (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.status(404).json("Cliente não encontrado.");
        }

        return res.status(200).json("Cliente atualizado com sucesso.");
    });
};