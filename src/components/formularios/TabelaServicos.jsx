import { useEffect, useState } from 'react';
import styles from './TabelaServicos.module.css';

function TabelaServicos() {
    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Função para buscar os serviços (isolada para poder ser reutilizada)
    const carregarServicos = () => {
        fetch('http://localhost:8800/servicos/hoje')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar dados');
                return res.json();
            })
            .then((data) => {
                setServicos(data);
                setCarregando(false);
            })
            .catch((err) => {
                console.error(err);
                setCarregando(false);
            });
    };

    useEffect(() => {
        carregarServicos();
    }, []);

    // Função que altera o status no clique do botão
    const alternarStatus = (id, statusAtual) => {
        const novoStatus = statusAtual === 'Pendente' ? 'Concluído' : 'Pendente';

        fetch(`http://localhost:8800/servicos/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: novoStatus }),
        })
        .then((res) => {
            if (!res.ok) throw new Error('Erro ao atualizar status');
            return res.json();
        })
        .then(() => {
            // Atualiza o estado do React imediatamente na tela sem precisar recarregar a página inteira
            setServicos(servicos.map(servico => 
                servico.id === id ? { ...servico, status: novoStatus } : servico
            ));
        })
        .catch((err) => console.error("Erro ao mudar status:", err));
    };

    if (carregando) {
        return <div className={styles.container}><p>A carregar serviços de hoje...</p></div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Serviços Agendados para Hoje</h2>
            
            <div className={styles.tabelaWrapper}>
                {servicos.length === 0 ? (
                    <p className={styles.semServicos}>Nenhum serviço agendado para o dia de hoje.</p>
                ) : (
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Descrição do Serviço</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map((servico) => (
                                <tr key={servico.id}>
                                    <td>{servico.nome_cliente}</td>
                                    <td>{servico.descricao}</td>
                                    <td>
                                        {Number(servico.valor).toLocaleString('pt-PT', {
                                            style: 'currency',
                                            currency: 'EUR'
                                        })}
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${
                                            servico.status === 'Pendente' 
                                                ? styles.statusPendente 
                                                : styles.statusConcluido
                                        }`}>
                                            {servico.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => alternarStatus(servico.id, servico.status)}
                                            className={`${styles.botaoStatus} ${
                                                servico.status === 'Pendente' 
                                                    ? styles.btnConcluir 
                                                    : styles.btnReabrir
                                            }`}
                                        >
                                            {servico.status === 'Pendente' ? 'Concluir' : 'Reabrir'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default TabelaServicos;
