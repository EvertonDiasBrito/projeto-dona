import styles from './Home.module.css'

function Home() {
    return (
        <section className={styles.home_container}>
            <img src="/logodonasf.png" alt="Dona Lavanderia" className={styles['logo-magenta']} />
            <h1>Bem-vindo ao Dona Lavanderia</h1>
            <p>Comece a gerenciar seus clientes e serviços</p>
            

        </section>
    )
}

export default Home