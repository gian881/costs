interface SubmitButtonProps {
    children: React.ReactNode
}

export function SubmitButton({ children }: SubmitButtonProps) {
    return (
        <button className="bg-gray-800 text-white hover:text-yellow-500 py-3 px-5 cursor-pointer rounded-md transition-colors duration-500">
            {children}
        </button>
    )
}