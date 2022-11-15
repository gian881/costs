import { MouseEvent } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

interface ServiceCardProps {
    id: string
    name: string
    cost: number
    description: string
    handleRemove: (id: string, cost: number) => void
}

export function ServiceCard({ id, name, cost, description, handleRemove }: ServiceCardProps) {
    function remove(event: MouseEvent) {
        event.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className="p-4 border border-gray-500 rounded-md w-full flex-1 max-w-xs m-2">
            <h4 className='font-bold bg-[#222] text-yellow-500 py-2 mb-5 text-xl rounded-md px-4 overflow-hidden'>
                {name}
            </h4>
            <p className='text-gray-500 mb-4'>
                <span className='font-bold'>Total cost:</span> R$ {cost.toFixed(2).replace('.', ',')}
            </p>

            <p className='text-gray-500 mb-4'>{description}</p>

            <div className="mt-5 flex items-center">
                <button onClick={remove} className="bg-white text-gray-800 py-1 px-2 sm:py-2 sm:px-4 mr-4 cursor-pointer border border-gray-800 flex items-center justify-center transition-colors duration-500 rounded-md hover:bg-gray-800 hover:text-yellow-500 text-xs sm:text-base">
                    <BsFillTrashFill /> Remove
                </button>
            </div>
        </div>
    )
}