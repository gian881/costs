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
            <div className="w-full p-2 sm:p-8 flex flex-col justify-start">
                {message && <Message msg={message} type={messageType} />}
                <div className="border-b border-gray-500 pb-5 mb-5 flex justify-between flex-wrap">
                    <h1 className='mb-2 bg-gray-800 text-yellow-500 p-2 rounded-md text-2xl font-bold overflow-hidden'>
                        Project: {(project as Project).name}
                    </h1>
                    <button
                        className="bg-gray-800 text-white hover:text-yellow-500 rounded-md py-2 px-4 cursor-pointer max-h-10 transition-colors duration-500 w-full sm:w-fit"
                        onClick={() => setShowProjectForm(prev => !prev)}>
                        {showProjectForm ? "Close" : "Edit project"}
                    </button>
                    {showProjectForm ? (
                        <div className="w-full mt-4">
                            <ProjectForm
                                btnText='Concluir edição'
                                handleSubmit={editPost}
                                projectData={(project as Project)}
                            />
                        </div>
                    ) : (
                        <div className="w-full mt-4">
                            <p className='mb-2'>
                                <span className='font-bold'>Category:</span> {(project as Project).category.name}
                            </p>
                            <p className='mb-2'>
                                <span className='font-bold'>Total budget:</span> R$ {(project as Project).budget.toFixed(2).replace('.', ',')}
                            </p>
                            <p className='mb-2'>
                                <span className='font-bold'>Budget utilized:</span> R$ {(project as Project).cost.toFixed(2).replace('.', ',')}
                            </p>
                        </div>
                    )}
                </div>
                <div className="border-b border-gray-500 pb-5 mb-5 flex justify-between flex-wrap">
                    <h2 className='mb-2 font-bold'>Add a service</h2>
                    <button className="bg-gray-800 text-white hover:text-yellow-500 rounded-md py-2 px-4 cursor-pointer max-h-10 transition-colors duration-500 w-full sm:w-fit" onClick={() => setShowServiceForm(prev => !prev)}>
                        {showServiceForm ? "Close" : "Add service"}
                    </button>
                    <div className="w-full">
                        {showServiceForm && (
                            <ServiceForm
                                handleSubmit={createService}
                                textBtn='Add service'
                                projectData={(project as Project)}
                            />
                        )}
                    </div>
                </div>
                <h2 className='mb-2 font-bold'>Services</h2>
                <div className="">
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
                        : <p className='mb-2'>There are no registered services</p>}
                </div>
            </div>
        </>
    )
}
