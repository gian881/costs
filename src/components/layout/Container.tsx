import { ReactNode } from 'react';
interface ContainerProps {
    children: ReactNode;
    customClass?: string;
    main?: boolean;
}

export function Container({ children, customClass = '', main }: ContainerProps) {
    function customClassTailwind() {
        let tailwindClass = '';

        switch (customClass) {
            case 'min-height':
                tailwindClass = 'flex-1'
                break;
            case 'start':
                tailwindClass = 'justify-start'
                break;
            case 'column':
                tailwindClass = 'flex-col justify-start'
                break;
            default:
                break;
        }

        return tailwindClass
    }

    return (
        <>
            {main
                ? (
                    <main className={`w-[90%] md:w-[75%] max-w-7xl flex justify-between my-0 mx-auto flex-wrap ${customClassTailwind()}`}>
                        {children}
                    </main>
                )
                : (
                    <div className={`w-[90%] md:w-[75%] max-w-7xl flex justify-between my-0 mx-auto flex-wrap ${customClassTailwind()}`}>
                        {children}
                    </div>
                )
            }
        </>


    )
}