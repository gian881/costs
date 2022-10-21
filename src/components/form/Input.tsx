import { ChangeEvent } from 'react'
import styles from './Input.module.css'
interface InputProps {
    type: string
    text: string
    name: string
    placeholder: string
    value?: string
    handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void
    currency?: boolean
}

export function Input({ type, text, name, placeholder, value, handleOnChange, currency }: InputProps) {
    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}</label>
            {currency
                ? <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value}
                    step="0.01"
                    min="0"
                />
                : <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value}
                />

            }

        </div>
    )
}