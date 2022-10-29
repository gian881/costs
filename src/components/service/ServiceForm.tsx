import { ChangeEvent, FormEvent, useState } from 'react'
import { ProjectFromApi } from '../../types'
import { Input } from '../form/Input'
import { SubmitButton } from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'

interface ServiceFormProps {
    handleSubmit: (project: ProjectFromApi) => void
    textBtn: string
    projectData: ProjectFromApi
}

export function ServiceForm({ handleSubmit, textBtn, projectData }: ServiceFormProps) {
    const [service, setService] = useState({} as ProjectFromApi['services'][0])

    function submit(event: FormEvent) {
        event.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.type === 'number') {
            setService({ ...service, [event.target.name]: Number(event.target.value) })
        }
        else {
            setService({ ...service, [event.target.name]: event.target.value })
        }
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Service name'
                name='name'
                placeholder='Fill the service name'
                handleOnChange={handleChange}
            />
            <Input
                type='number'
                text='Service cost'
                name='cost'
                placeholder='R$ 0,00'
                handleOnChange={handleChange}
                currency
            />
            <Input
                type='text'
                text='Description'
                name='description'
                placeholder='Fill description'
                handleOnChange={handleChange}
            />
            <SubmitButton text={textBtn} />
        </form>
    )
}