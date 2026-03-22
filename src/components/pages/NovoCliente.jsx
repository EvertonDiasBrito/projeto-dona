import { useNavigate } from "react-router-dom";
import ClienteForm from "../formularios/ClienteForm.jsx";;
import styles from './NovoCliente.module.css';

function NovoCliente() {
    const navigate = useNavigate();
    function createPost(cliente){
        fetch("http://localhost:8800/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                navigate("/clientes", { state: { message: "Cliente criado com sucesso!" } });
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles.novocliente_container}>
            <h1>Novo Cliente</h1>
            <p>Cadastre um novo cliente </p>
            <ClienteForm handleSubmit={createPost} btnText="Cadastrar Cliente" />
        </div>
    )

}
export default NovoCliente;

