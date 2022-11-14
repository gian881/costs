import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api/projectsApi';
import { ProjectForm } from '../components/project/ProjectForm';
import { Project } from '../types';

export function NewProject() {
    const navigate = useNavigate();
    const createProjectMutation = useMutation((project: Project) => createProject(project), {
        onSuccess: () => {
            navigate('/projects', { state: { message: 'Project created successfully!' } })
        }
    })

    function createNewProject(project: Project) {
        project.cost = 0
        project.services = []

        createProjectMutation.mutate(project)
    }

    return (
        <div className="w-[450px] my-0 mx-auto px-4 py-8 sm:p-12">
            <h1 className='mb-2 font-bold text-4xl'>Create Project</h1>
            <p className='text-gray-500'>Create your project so you can add services</p>
            <ProjectForm handleSubmit={createNewProject} btnText="Create Project" />
        </div>
    )
}