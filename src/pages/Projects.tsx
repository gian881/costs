import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { deleteProject, getProjects } from "../api/projectsApi";
import { LinkButton } from "../components/layout/LinkButton";
import { Loading } from "../components/layout/Loading";
import { Message } from "../components/layout/Message";
import { ProjectCard } from "../components/project/ProjectCard";

export function Projects() {
    const [projectMessage, setProjectMessage] = useState('')

    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery(['projects'], getProjects)
    const projects = data ?? []

    const deleteProjectMutation = useMutation((id: string) => deleteProject(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
            setProjectMessage('Project removed successfully!')
        }
    })

    const location = useLocation()
    const message = location.state ? location.state.message : ''

    function removeProject(id: number) {
        deleteProjectMutation.mutate(id.toString())
    }

    return (
        <div className="p-8 w-full">
            <div className="flex justify-between items-center flex-col sm:flex-row">
                <h1 className="font-bold text-4xl mb-4 sm:mb-0">My Projects</h1>
                <LinkButton to="/newproject">Create Project</LinkButton>
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            <div className="flex flex-col sm:flex-row items-center flex-wrap mt-4">
                {isLoading ? <Loading /> : null}
                {isError ? (
                    <p>Something went wrong while trying to get the projects</p>
                ) : null}
                {!isLoading && !isError && projects.length === 0 ? (
                    <>
                        <p>No projects found.</p>
                        <p>You can create a new project by clicking the button on the top right.</p>
                    </>
                ) : null}
                {!isLoading && !isError && projects.length > 0
                    ? projects.map(project => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                            key={project.id}
                        />
                    ))
                    : null}
            </div>
        </div>
    )
}