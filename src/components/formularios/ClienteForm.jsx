import { useEffect, useState } from "react";
import Input from "./Input.jsx";
import SubmitButton from "./SubmitButton";


function ClienteForm({ handleSubmit, btnText, clienteData }) {
    const [cliente, setCliente] = useState(clienteData || {});


    useEffect(() => {
        if (!clienteData?.id) return;
        
        fetch(`http://localhost:8800/users/${clienteData.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCliente({
                id: data.id,
                cliente: data.Cliente || data.cliente,
                fone: data.Fone || data.fone,
                morada: data.Morada || data.morada
            });
        })
        .catch((err) => console.log( err));
    }, [clienteData]);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(cliente);
    }

    function handleChange(e) {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={submit}>
            <Input type="text" text="Cliente" name="Cliente" placeholder="Insira o nome do cliente" handleOnChange={handleChange} value={cliente.Cliente || ''} />
            <Input type="text" text="Telefone" name="Fone" placeholder="Insira o telefone do cliente" handleOnChange={handleChange} value={cliente.Fone || ''} />
            <Input type="text" text="Morada" name="Morada" placeholder="Insira a morada do cliente" handleOnChange={handleChange} value={cliente.Morada || ''} />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ClienteForm;