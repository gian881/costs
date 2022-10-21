import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Container } from "../components/layout/Container";
import { LinkButton } from "../components/layout/LinkButton";
import { Loading } from "../components/layout/Loading";
import { Message } from "../components/layout/Message";
import { ProjectCard } from "../components/project/ProjectCard";
import styles from './Projects.module.css';

export interface ProjectFromApi {
    category: {
        id: number
        name: string
    },
    name: string
    budget: number
    cost: number
    services: {
        name: string
        cost: number
        description: string
        id: string
    }[],
    id: number
}

export function Projects() {
    const [projects, setProjects] = useState<ProjectFromApi[]>([])
    const [loading, setLoading] = useState(true)
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(() => {
        const controller = new AbortController()
        fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://exclusive-golden-relish.glitch.me"}/projects`, {
            signal: controller.signal,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setProjects(data)
                setLoading(false)
            })
            .catch(error => { if (!(error instanceof DOMException)) console.error(error) })
        return () => controller.abort()

    }, [])

    const location = useLocation()
    const message = location.state ? location.state.message : ''

    function removeProject(id: number) {
        fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://exclusive-golden-relish.glitch.me"}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(() => {
                setProjects(projects.filter(project => project.id !== id))
                setProjectMessage('Project removed successfully!')
            })
            .catch(error => console.error(error))
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject">Create Project</LinkButton>
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            <Container customClass="start">
                {projects.length > 0 && projects.map(project =>
                (<ProjectCard
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project.category.name}
                    handleRemove={removeProject}
                    key={project.id}
                />))}
                {loading && <Loading />}
                {!loading && projects.length === 0 && <p>No projects found</p>}
            </Container>
        </div>
    )
}