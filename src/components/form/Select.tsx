import { ChangeEvent } from 'react'
import { Option } from '../../types'
import styles from './Select.module.css'

interface SelectProps {
    text: string
    name: string
    options: Option[]
    value?: number
    handleOnChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function Select({ text, name, options, handleOnChange, value }: SelectProps) {
    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}</label>
            {
                value ? (
                    <select
                        name={name}
                        id={name}
                        value={value}
                        onChange={handleOnChange}
                    >
                        {options.map((opcao) => (
                            <option value={opcao.id} key={opcao.id}>
                                {opcao.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <select
                        name={name}
                        id={name}
                        defaultValue={0}
                        onChange={handleOnChange}
                    >
                        <option value={0} hidden disabled>Select one option</option>

                        {options.map((opcao) => (
                            <option value={opcao.id} key={opcao.id}>
                                {opcao.name}
                            </option>
                        ))}
                    </select>
                )
            }

        </div>
    )
}