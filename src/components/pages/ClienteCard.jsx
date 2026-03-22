import styles from './ClientesCard.module.css';

function ClienteCard({ id, cliente, fone, morada, handleRemove }) {
  return (
    <div className={styles.clientes_card}>
      <h4>{cliente}</h4>
      <p><span>Telefone:</span> {fone}</p>
      <p><span>Morada:</span> {morada}</p>
      <div>
        <button onClick={() => handleRemove(id)}>Remover</button>
      </div>
    </div>
  )
}

export default ClienteCard;