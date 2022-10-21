import { MouseEvent } from 'react'
import { BsFillTrashFill, BsPencil } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
    id: number
    name: string
    budget: number
    category: string
    handleRemove: (id: number) => void

}

export function ProjectCard({ id, name, budget, category, handleRemove }: ProjectCardProps) {
    function remove(event: MouseEvent) {
        event.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Budget:</span> R$ {budget.toFixed(2).replace('.', ',')}
            </p>
            <p className={styles.categoryText}>
                <span className={styles[category.toLowerCase()]}></span>{category}
            </p>
            <div className={styles.projectCardActions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Edit
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remove
                </button>
            </div>
        </div>
    )
}