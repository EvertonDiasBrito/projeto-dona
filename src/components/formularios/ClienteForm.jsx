import { useEffect, useState } from "react";
import Input from "./Input.jsx";
import SubmitButton from "./SubmitButton";


function ClienteForm({ handleSubmit, btnText, clienteData }) {
    const [cliente, setCliente] = useState(clienteData?.cliente || {});


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
            setCliente(data);
        })
        .catch((err) => console.log( err));
    }, [])

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(cliente);
    }

    function handleChange(e) {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={submit}>
            <Input type="text" text="Cliente" name="cliente" placeholder="Insira o nome do cliente" handleOnChange={handleChange} value={cliente.cliente || ''} />
            <Input type="text" text="Telefone" name="fone" placeholder="Insira o telefone do cliente" handleOnChange={handleChange} value={cliente.fone || ''} />
            <Input type="text" text="Morada" name="morada" placeholder="Insira a morada do cliente" handleOnChange={handleChange} value={cliente.morada || ''} />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ClienteForm;