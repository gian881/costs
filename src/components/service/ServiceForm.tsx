import { ChangeEvent, FormEvent, useState } from 'react'
import { Project } from '../../types'
import { Input } from '../form/Input'
import { SubmitButton } from '../form/SubmitButton'

interface ServiceFormProps {
    handleSubmit: (project: Project) => void
    textBtn: string
    projectData: Project
}

export function ServiceForm({ handleSubmit, textBtn, projectData }: ServiceFormProps) {
    const [service, setService] = useState({} as Project['services'][0])

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
        <form onSubmit={submit} className="w-full my-8 flex flex-col">
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
            <SubmitButton>{textBtn}</SubmitButton>
        </form>
    )
}