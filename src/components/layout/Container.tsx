import { ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: ReactNode;
    customClass?: string;
    main?: boolean;
}

export function Container({ children, customClass = '', main }: ContainerProps) {
    return (
        <>
            {main
                ? (
                    <main className={`${styles.container} ${styles[customClass]}`}>
                        {children}
                    </main>
                )
                : (
                    <div className={`${styles.container} ${styles[customClass]}`}>
                        {children}
                    </div>
                )
            }
        </>


    )
}