import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { getProjectById, updateProject } from '../api/projectsApi'
import { Container } from '../components/layout/Container'
import { Loading } from '../components/layout/Loading'
import { Message } from '../components/layout/Message'
import { ProjectForm } from '../components/project/ProjectForm'
import { ServiceCard } from '../components/service/ServiceCard'
import { ServiceForm } from '../components/service/ServiceForm'
import { Project } from '../types'
import styles from './Project.module.css'


export function ProjectPage() {
    const { id } = useParams<{ id: string }>()
    const queryClient = useQueryClient()

    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'success' | 'error'>('success')

    const { data: project, isLoading, error } = useQuery(['project', id], () => getProjectById(id as string))

    const editProjectMutation = useMutation(updateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries(['project'])
            setShowProjectForm(false)
            setMessage('Project updated!')
            setMessageType('success')
        },
        onError: () => {
            setMessage('Something went wrong!')
            setMessageType('error')
        }
    })

    const removeServiceMutation = useMutation(updateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries(['project'])
            setMessage('Service removed successfully!')
            setMessageType('success')
        },
        onError: () => {
            setMessage('Something went wrong!')
            setMessageType('error')
        }
    })

    const createServiceMutation = useMutation(updateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries(['project'])
            setShowServiceForm(false)
        },
        onError: () => {
            setMessage('Something went wrong!')
            setMessageType('error')
        }
    })

    function editPost(project: Project) {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage('Budget cannot be less than cost!')
            setMessageType('error')
            return
        }

        editProjectMutation.mutate(project)

    }

    function removeService(id: string, cost: number) {
        setMessage('')

        const projectUpdated = project as Project

        projectUpdated.services = projectUpdated.services.filter(service => service.id !== id)
        projectUpdated.cost -= cost

        removeServiceMutation.mutate(projectUpdated)
    }

    function createService(project: Project) {
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

        createServiceMutation.mutate(project)
    }


    if (isLoading) {
        return (
            <Container>
                <Loading />
            </Container>
        )

    }

    if (error) {
        return (
            <Container>
                <p>Something went wrong while trying to get the project information!</p>
            </Container>
        )
    }

    return (
        <>
            <div className={styles.projectDetails}>
                <Container customClass="column">
                    {message && <Message msg={message} type={messageType} />}
                    <div className={styles.detailsContainer}>
                        <h1>Project: {(project as Project).name}</h1>
                        <button className={styles.btn} onClick={() => setShowProjectForm(prev => !prev)}>{showProjectForm ? "Close" : "Edit project"}</button>
                        {showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <ProjectForm btnText='Concluir edição' handleSubmit={editPost} projectData={(project as Project)} />
                            </div>
                        ) : (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Category:</span> {(project as Project).category.name}
                                </p>
                                <p>
                                    <span>Total budget:</span> R$ {(project as Project).budget.toFixed(2).replace('.', ',')}
                                </p>
                                <p>
                                    <span>Budget utilized:</span> R$ {(project as Project).cost.toFixed(2).replace('.', ',')}
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
                                    projectData={(project as Project)}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Services</h2>
                    <Container customClass='start'>
                        {(project as Project).services.length > 0
                            ? (project as Project).services.map(service => (
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
        </>
    )
}
