import { useState, useEffect } from 'react';
import styles from './FormularioServico.module.css';


function FormularioServico({ onServicoAdicionado }) {
    const [clientes, setClientes] = useState([]);
    const [servico, setServico] = useState({
        cliente_id: '',
        descricao: '',
        valor: '',
        data_servico: '',
        status: 'Pendente'
    });
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetch('http://localhost:8800/users')
            .then(res => res.json())
            .then(data => setClientes(data))
            .catch(err => console.error("Erro ao buscar clientes:", err));
    }, []);

    function handleChange(e) {
        setServico({ ...servico, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!servico.Cliente_id || !servico.descricao || !servico.valor || !servico.data_servico) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        fetch('http://localhost:8800/servicos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(servico),
        })
        .then(res => res.json())
        .then(() => {
            setMensagem('Serviço agendado com sucesso!');
            setServico({ Cliente_id: '', descricao: '', valor: '', data_servico: '', status: 'Pendente' });
            
            // EXECUTA A ATUALIZAÇÃO AUTOMÁTICA DA TABELA AQUI
            if (onServicoAdicionado) onServicoAdicionado(); 
        })
        .catch(err => setMensagem('Erro ao salvar o serviço.'));
    } 

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.titulo}>Agendar Novo Serviço</h2>
            {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
            
            <form onSubmit={handleSubmit}>
                <div className={styles.formGrupo}>
                    <label>Cliente:</label>
                    <select 
                        name="Cliente_id" 
                        value={servico.Cliente_id} 
                        onChange={handleChange}
                        className={styles.selectField}
                    >
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cli => (
                            <option key={cli.id} value={cli.id}>
                                {cli.Cliente}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGrupo}>
                    <label>Descrição do Serviço:</label>
                    <input 
                        type="text" 
                        name="descricao" 
                        value={servico.descricao} 
                        onChange={handleChange} 
                        placeholder="Ex: Lavagem Completa"
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.formGrupo}>
                    <label>Valor (€):</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        name="valor" 
                        value={servico.valor} 
                        onChange={handleChange} 
                        placeholder="0.00"
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.formGrupo}>
                    <label>Data do Serviço:</label>
                    <input 
                        type="date" 
                        name="data_servico" 
                        value={servico.data_servico} 
                        onChange={handleChange} 
                        className={styles.inputField}
                    />
                </div>

                <button type="submit" className={styles.botaoSubmeter}>Agendar Serviço</button>
            </form>
        </div>
    );
}

export default FormularioServico;