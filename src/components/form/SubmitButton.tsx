import styles from './SubmitButton.module.css'

interface SubmitButtonProps {
    text: string
}

export function SubmitButton({ text }: SubmitButtonProps) {
    return <button className={styles.bnt}>{text}</button>
}