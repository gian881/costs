import { useEffect, useState } from 'react'
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
                <div className={`w-full p-4 border mx-auto text-center my-8 rounded-md ${type}`}>
                    {msg}
                </div>
            )}
        </>
    )
}