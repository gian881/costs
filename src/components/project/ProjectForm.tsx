import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ProjectFromApi } from '../../pages/Projects'
import { Input } from '../form/Input'
import { Select } from '../form/Select'
import { SubmitButton } from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

export interface Option {
    id: number
    name: string
}

interface ProjectFormProps {
    handleSubmit: (project: ProjectFromApi) => void
    btnText: string
    projectData?: ProjectFromApi
}

export function ProjectForm({ handleSubmit, btnText, projectData }: ProjectFormProps) {
    const [categories, setCategories] = useState<Option[]>([])
    const [project, setProject] = useState<ProjectFromApi>(projectData || {} as ProjectFromApi)

    useEffect(() => {
        const controller = new AbortController()
        fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://exclusive-golden-relish.glitch.me"}/categories`, {
            signal: controller.signal,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => setCategories(data))
            .catch(error => { if (!(error instanceof DOMException)) console.error(error) })
        return () => controller.abort()

    }, [])

    const submit = (e: FormEvent) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e?.target?.name === 'budget') {
            setProject({ ...project, [e?.target?.name]: Number(e?.target?.value) })
        } else {
            setProject({ ...project, [e?.target?.name]: e?.target?.value })
        }
    }

    function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
        setProject({
            ...project, category: {
                id: Number(e?.target?.value),
                name: e?.target?.options[e?.target?.selectedIndex].text
            }
        })
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Name of the project'
                name='name'
                placeholder='The name of the project'
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />

            <Input
                type='number'
                text='Budget of the project'
                name='budget'
                placeholder='The total budget of the project'
                handleOnChange={handleChange}
                value={project.budget?.toString() ? project.budget.toString() : ''}
                currency
            />
            {project.category?.id ? (
                <Select
                    name='category_id'
                    text='Select the category'
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category?.id}
                />) : (
                <Select
                    name='category_id'
                    text='Select the category'
                    options={categories}
                    handleOnChange={handleCategory}
                />
            )}

            <SubmitButton text={btnText} />
        </form >
    )
}