import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-8 pb-2 text-center">
            <ul className="flex justify-center list-none ">
                <li className='mx-4 cursor-pointer hover:text-yellow-500'>
                    <FaFacebook className='text-2xl' />
                </li>
                <li className='mx-4 cursor-pointer hover:text-yellow-500'>
                    <FaInstagram className='text-2xl' />
                </li>
                <li className='mx-4 cursor-pointer hover:text-yellow-500'>
                    <FaLinkedin className='text-2xl' />
                </li>
            </ul>
            <p className="mt-8"><span className='font-bold text-yellow-500'>Costs</span> &copy; 2022</p>
            <p className="mt-4">Developed by <a className='text-white transition-colors duration-500 hover:text-yellow-500' href="https://github.com/gian881/costs" target="_blank"><FaGithub className='inline' /> Gian Santos</a></p>

        </footer>
    )
}