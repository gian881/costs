import { Link } from 'react-router-dom'
import logo from '../../img/costs_logo.png'
import { Container } from './Container'
import styles from './Navbar.module.css'

export function Navbar() {
    return (
        <header>
            <nav className={styles.navbar}>
                <Container>
                    <Link to='/'><img src={logo} alt="Costs" /></Link>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link to='/'>Home</Link>
                        </li>

                        <li className={styles.item}>
                            <Link to='/projects'>Projects</Link>
                        </li>
                    </ul>
                </Container>
            </nav>
        </header>
    )
}