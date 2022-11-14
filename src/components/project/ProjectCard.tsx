import { MouseEvent } from 'react'
import { BsFillTrashFill, BsPencil } from 'react-icons/bs'
import { Link } from 'react-router-dom'
interface ProjectCardProps {
    id: number
    name: string
    budget: number
    category: string
    handleRemove: (id: number) => void

}

export function ProjectCard({ id, name, budget, category, handleRemove }: ProjectCardProps) {
    function remove(event: MouseEvent) {
        event.preventDefault()
        handleRemove(id)
    }

    return (
        <div className="p-4 border border-gray-500 rounded-md w-full sm:w-1/3 sm:max-w-xs m-2">
            <h4 className='bg-[#222] text-yellow-500 py-2 mb-5 text-xl rounded-md px-4 overflow-hidden'>
                {name}
            </h4>

            <p className='text-gray-500 mb-4'>
                <span className='font-bold'>Budget:</span> R$ {budget.toFixed(2).replace('.', ',')}
            </p>

            <p className="flex items-center">
                <span className={`block w-3 h-3 rounded-full bg-gray-200 mr-1 ${category.toLowerCase()}`}></span>
                {category}
            </p>

            <div className="mt-5 flex items-center">
                <Link to={`/project/${id}`} className="bg-white text-gray-800 py-1 px-2 sm:py-2 sm:px-4 mr-4 cursor-pointer border border-gray-800 flex items-center justify-center transition-colors duration-500 rounded-md hover:bg-gray-800 hover:text-yellow-500 text-xs sm:text-base">
                    <BsPencil className='mr-2' /> Edit
                </Link>

                <button onClick={remove} className="bg-white text-gray-800 py-1 px-2 sm:py-2 sm:px-4 mr-4 cursor-pointer border border-gray-800 flex items-center justify-center transition-colors duration-500 rounded-md hover:bg-gray-800 hover:text-yellow-500 text-xs sm:text-base">
                    <BsFillTrashFill className='mr-2' /> Remove
                </button>
            </div>
        </div>
    )
}