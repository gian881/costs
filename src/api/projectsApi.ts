import { Project } from "../types"

export async function getProjects(): Promise<Project[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

export async function getProjectById(id: string): Promise<Project> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

export async function updateProject(project: Project): Promise<Project> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${project.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    })
    return res.json()
}

export async function createProject(project: Project): Promise<Project> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    })
    return res.json()
}

export async function deleteProject(id: string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.json()
}