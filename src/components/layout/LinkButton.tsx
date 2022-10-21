import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

interface LinkButtonProps {
    to: string
    children: ReactNode
}

export function LinkButton({ to, children }: LinkButtonProps) {
    return (
        <Link className={styles.btn} to={to}>
            {children}
        </Link>
    )
}