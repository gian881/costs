import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { getCategories } from '../../api/categoriesApi'
import { Category, Project } from '../../types'
import { Input } from '../form/Input'
import { Select } from '../form/Select'
import { SubmitButton } from '../form/SubmitButton'
import { Loading } from '../layout/Loading'
import { Error } from '../layout/Error'
import styles from './ProjectForm.module.css'

interface ProjectFormProps {
    handleSubmit: (project: Project) => void
    btnText: string
    projectData?: Project
}

export function ProjectForm({ handleSubmit, btnText, projectData }: ProjectFormProps) {
    const [project, setProject] = useState<Project>(projectData || {} as Project)
    const { data: categories, isError, error, isLoading } = useQuery(['categories'], getCategories)

    function submit(e: FormEvent) {
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
            {isLoading ? <Loading /> : isError ? <Error message="Something wen't wrong while trying to get the categories" /> : project.category?.id ? (
                <Select
                    name='category_id'
                    text='Select the category'
                    options={categories as Category[]}
                    handleOnChange={handleCategory}
                    value={project.category?.id}
                />) : (
                <Select
                    name='category_id'
                    text='Select the category'
                    options={categories as Category[]}
                    handleOnChange={handleCategory}
                />
            )}

            <SubmitButton text={btnText} />
        </form >
    )
}
