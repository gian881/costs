import { useEffect, useState } from 'react'
import styles from './Message.module.css'

interface MessageProps {
    type: 'error' | 'success'
    msg: string
}

export function Message({ type, msg }: MessageProps) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisible(false)
            return
        }
        setVisible(true)
        const timer = setTimeout(() => { setVisible(false) }, 3000)
        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>
                    {msg}
                </div>
            )}
        </>
    )
}