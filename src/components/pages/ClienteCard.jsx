import styles from './ClientesCard.module.css';
import { BsFillTabletFill, BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ClienteCard({ id, cliente, fone, morada, handleRemove }) {
  
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  }
  
  return (
    <div className={styles.clientes_card}>
      <h4>{cliente}</h4>
      <p><span>Telefone:</span> {fone}</p>
      <p><span>Morada:</span> {morada}</p>
      <div className={styles.clientes_card_actions}>
        <Link to={`/clientes/${id}`}>
            <h1><BsPencil /> Editar </h1>
        </Link>
        <button onClick={remove}>
            <BsFillTabletFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default ClienteCard;