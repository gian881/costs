import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Container } from '../components/layout/Container'
import { Loading } from '../components/layout/Loading'
import { Message } from '../components/layout/Message'
import { ProjectForm } from '../components/project/ProjectForm'
import { ServiceCard } from '../components/service/ServiceCard'
import { ServiceForm } from '../components/service/ServiceForm'
import { ProjectFromApi } from '../types'
import styles from './Project.module.css'


export function ProjectPage() {
    const { id } = useParams<{ id: string }>()
    const [project, setProject] = useState<ProjectFromApi>({} as ProjectFromApi)
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setServices] = useState<ProjectFromApi['services']>([])
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'success' | 'error'>('success')

    function editPost(project: ProjectFromApi) {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage('Budget cannot be less than cost!')
            setMessageType('error')
            return
        }

        fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Project updated!')
                setMessageType('success')
            })
            .catch(() => {
                setMessage('Something went wrong!')
                setMessageType('error')
            })
    }

    function removeService(id: string, cost: number) {
        const servicesUpdated = services.filter(service => service.id !== id)
        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost -= cost

        fetch(`${import.meta.env.VITE_API_URL}/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUpdated)
        })
            .then(res => res.json())
            .then(() => {
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage('Service removed successfully!')
                setMessageType('success')
            })
            .catch(err => console.error(err))

    }

    function createService(project: ProjectFromApi) {
        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = project.cost + lastServiceCost

        if (newCost > project.budget) {
            setMessage('Over budget! Please verify the cost of the service.')
            setMessageType('error')
            project.services.pop()
            return
        }

        project.cost = newCost

        fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(() => {
                setShowServiceForm(prev => !prev)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        const controller = new AbortController()
        fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
            signal: controller.signal,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setProject(data)
                setServices(data.services)
            })
            .catch(error => { if (!(error instanceof DOMException)) console.error(error) })
        return () => controller.abort()

    }, [id])

    return (
        <>
            {project?.name ?
                (
                    <div className={styles.projectDetails}>
                        <Container customClass="column">
                            {message && <Message msg={message} type={messageType} />}
                            <div className={styles.detailsContainer}>
                                <h1>Project: {project?.name}</h1>
                                <button className={styles.btn} onClick={() => setShowProjectForm(prev => !prev)}>{showProjectForm ? "Close" : "Edit project"}</button>
                                {showProjectForm ? (
                                    <div className={styles.projectInfo}>
                                        <ProjectForm btnText='Concluir edição' handleSubmit={editPost} projectData={project} />
                                    </div>
                                ) : (
                                    <div className={styles.projectInfo}>
                                        <p>
                                            <span>Category:</span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Total budget:</span> R$ {project.budget.toFixed(2).replace('.', ',')}
                                        </p>
                                        <p>
                                            <span>Budget utilized:</span> R$ {project.cost.toFixed(2).replace('.', ',')}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className={styles.serviceFormContainer}>
                                <h2>Add a service</h2>
                                <button className={styles.btn} onClick={() => setShowServiceForm(prev => !prev)}>
                                    {showServiceForm ? "Close" : "Add service"}
                                </button>
                                <div className={styles.projectInfo}>
                                    {showServiceForm && (
                                        <ServiceForm
                                            handleSubmit={createService}
                                            textBtn='Add service'
                                            projectData={project}
                                        />
                                    )}
                                </div>
                            </div>
                            <h2>Services</h2>
                            <Container customClass='start'>
                                {services.length > 0
                                    ? services.map(service => (
                                        <ServiceCard
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))
                                    : <p>There are no registered services</p>}
                            </Container>
                        </Container>
                    </div>
                )
                :
                <Loading />
            }
        </>
    )
}
