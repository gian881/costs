import { MouseEvent } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import styles from '../project/ProjectCard.module.css'

interface ServiceCardProps {
    id: string
    name: string
    cost: number
    description: string
    handleRemove: (id: string, cost: number) => void
}

export function ServiceCard({ id, name, cost, description, handleRemove }: ServiceCardProps) {
    function remove(event: MouseEvent) {
        event.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Total cost:</span> R$ {cost.toFixed(2).replace('.', ',')}
            </p>
            <p>{description}</p>
            <div className={styles.projectCardActions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remove
                </button>
            </div>
        </div>
    )
}