import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from './Message'
import styles from './Clientes.module.css'
import Container from '../layout/Container'

import LinkButton from '../layout/LinkButton'
import ClienteCard from './ClienteCard'
import Loading from '../layout/Loading'


  

function Clientes() {
  const [clientes, setClientes] = useState([]) 
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()
  const message = location.state?.message

  useEffect(() => {
    setTimeout(() => {

      fetch(`http://localhost:8800/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setClientes(data)
          setRemoveLoading(true)
          
        })
        .catch(err => console.log(err))
    }, 300);
    }, [])

    function removeCliente(id) {
      fetch(`http://localhost:8800/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        
      })
        .then(resp => resp.json())
        .then(()=> {
          setClientes(clientes.filter(cliente => cliente.id !== id))
          setProjectMessage('cliente removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className={styles.clientes_container}>
      <div className={styles.title_container}>
        <h1>Clientes Cadastrados</h1>
        <LinkButton to="/novocliente" text="Cadastrar Cliente" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {clientes.length > 0 &&
          clientes.map((cliente) =>
            <ClienteCard
                key={cliente.id}
                id={cliente.id}
                cliente={cliente.Cliente}
                fone={cliente.Fone}
                morada={cliente.Morada}
                handleRemove={removeCliente}
            />)}  
            {!removeLoading && <Loading />}
            { removeLoading && clientes.length === 0 && (<p>Não há clientes cadastrados!</p>
            )}
            
      </Container>
    </div>
  );
}

export default Clientes