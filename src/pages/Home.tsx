import { LinkButton } from '../components/layout/LinkButton'
import savings from '../img/savings.svg'
import styles from './Home.module.css'

export function Home() {
    return (
        <section className={styles.homeContainer}>
            <h1>Welcome to <span>Costs</span></h1>
            <p>Start managing your projects right now!</p>
            <LinkButton to='/newproject'>Create a new project</LinkButton>
            <img src={savings} alt="Costs" />
        </section>
    )
}