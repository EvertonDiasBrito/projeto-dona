import { db } from "../db.js"; 

// Buscar apenas os serviços do dia atual
export const getServicosHoje = (req, res) => {
    const q = `
        SELECT s.*, c.cliente AS nome_cliente 
        FROM servicos s
        JOIN dona_clientes c ON s.cliente_id = c.id
        WHERE s.data_servico = CURDATE()
    `;

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

// Adicionar um novo serviço
export const addServico = (req, res) => {
    const q = "INSERT INTO servicos(\`cliente_id\`, \`descricao\`, \`valor\`, \`data_servico\`, \`status\`) VALUES(?)";

    const values = [
        req.body.cliente_id,
        req.body.descricao,
        req.body.valor,
        req.body.data_servico,
        req.body.status || 'Pendente'
    ];

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json("Serviço criado com sucesso!");
    });
};

// Atualizar o status de um serviço
export const updateStatusServico = (req, res) => {
    const q = "UPDATE servicos SET \`status\` = ? WHERE \`id\` = ?";

    const values = [
        req.body.status,
        req.params.id
    ];

    db.query(q, values, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json("Serviço não encontrado.");
        return res.status(200).json("Status atualizado com sucesso!");
    });
};

// Eliminar um serviço
export const deleteServico = (req, res) => {
    const q = "DELETE FROM servicos WHERE \`id\` = ?";

    db.query(q, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json("Serviço não encontrado.");
        return res.status(200).json("Serviço eliminado com sucesso!");
    });
};
