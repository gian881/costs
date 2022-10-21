import { useNavigate } from 'react-router-dom';
import { ProjectForm } from '../components/project/ProjectForm';
import styles from './NewProject.module.css';
import { ProjectFromApi } from './Projects';


export function NewProject() {
    const navigate = useNavigate();

    function createPost(project: ProjectFromApi) {
        // initialize costs and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        }).then(resp => resp.json())
            .then(data => {
                console.log(data)
                navigate('/projects', { state: { message: 'Project created successfully!' } })
            })
            .catch(err => console.error(err))
    }


    return (
        <div className={styles.newProjectContainer}>
            <h1>Create Project</h1>
            <p>Create your project so you can add services</p>
            <ProjectForm handleSubmit={createPost} btnText="Create Project" />
        </div>
    )
}