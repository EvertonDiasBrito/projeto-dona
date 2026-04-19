import styles from './Cliente.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Container from '../layout/Container';
import ClienteForm from '../formularios/ClienteForm';
import Message from '../pages/Message';


function Cliente() {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null)
    const [showClienteForm, setShowClienteForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        fetch(`http://localhost:8800/clientes/${id}`)
            .then((resp) => resp.json())
            .then((data) => {
                setCliente(Array.isArray(data) ? data[0] : data);
            })
            .catch((err) => console.log("Erro ao procurar cliente:", err));
    }, [id]);

    function editPost(clienteAtualizado) {

        setMessage('');
        fetch(`http://localhost:8800/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteAtualizado),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCliente(clienteAtualizado); // Atualiza o estado local com os novos dados
                setShowClienteForm(false); // Fecha o formulário após editar
                setMessage('Cliente atualizado com sucesso!');
                setType('success');
            })
            .catch((err) => {
                console.error("Erro ao atualizar cliente:", err);
                setMessage('Erro ao atualizar cliente.');
                setType('error');
            });

    }

    function toggleClienteForm() {
        setShowClienteForm(!showClienteForm);
    }
    

    return (
        <>
            {cliente ? (
                <div>
                    <Container>
                         {message && <Message type={type ?? ''} msg={message ?? ''} />}
                        <div>
                            <h1>Cliente: {cliente.nome}</h1>
                            <button onClick={toggleClienteForm}>
                                {!showClienteForm ? "Editar cliente" : "Fechar edição"}
                            </button>
                             {!showClienteForm ? (
                                    <div>
                                        <p><span>Cliente:</span> {cliente.cliente}</p>
                                        <p><span>Telefone:</span> {cliente.fone}</p>
                                        <p><span>Morada:</span> {cliente.morada}</p>
                                    </div>
                                 ) : (
                                <div className={styles.cliente_form}>
                                    <ClienteForm
                                        handleSubmit={editPost}
                                        btnText='Concluir Edição'
                                        clienteData={cliente}
                                    />  
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <p>A carregar dados...</p>
            )}
        </>
    );

}
    



export default Cliente;