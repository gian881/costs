import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api/projectsApi';
import { ProjectForm } from '../components/project/ProjectForm';
import { Project } from '../types';
import styles from './NewProject.module.css';



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
        <div className={styles.newProjectContainer}>
            <h1>Create Project</h1>
            <p>Create your project so you can add services</p>
            <ProjectForm handleSubmit={createNewProject} btnText="Create Project" />
        </div>
    )
}