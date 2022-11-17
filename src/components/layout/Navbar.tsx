import { Link } from 'react-router-dom'
import logo from '../../img/costs_logo.png'

export function Navbar() {
    return (
        <header>
            <div className="lg:flex lg:justify-center lg:items-center bg-gray-800">
                <nav className="bg-gray-800 w-full flex justify-between p-4 lg:max-w-7xl">
                    <Link to='/'><img src={logo} alt="Costs" /></Link>
                    <ul className="flex list-none items-center">
                        <li className="mr-4 text-2xl">
                            <Link to='/' className='text-white hover:text-yellow-500'>Home</Link>
                        </li>

                        <li className="mr-4 text-2xl">
                            <Link to='/projects' className='text-white hover:text-yellow-500'>Projects</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}