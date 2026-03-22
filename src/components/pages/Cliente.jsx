import styles from './Cliente.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Cliente() {
    const { id } = useParams();

    const [cliente, setCliente] = useState([])
     
    const [services, setServices] = useState()


    const[type, setType] = useState();


    useEffect(() => {
    setTimeout(() => {
        fetch(`http://localhost:8800/users/${id}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            
            setCliente(data[0] || data); 
            setServices(data.services || []);
        })
        .catch((err) => console.log("Erro ao procurar cliente:", err));
    }, 300);
}, [id]);

return (
    <div>
        {Cliente.cliente ? (
            <h1>Cliente: {Cliente.cliente}</h1>
        ) : (
            <p>A carregar dados...</p>
        )}
    </div>
);

 

}

export default Cliente;