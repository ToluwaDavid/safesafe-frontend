import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Navbar = () => {
    const {user, logout} = useAuth()
  return (
    <>
        <nav className='bg-white border-b'>
            <div className='container mx-auto px-4 py-3 flex item-center justify-between'>
                <div>
                    <Link to='/' className='font-bold text-lg'>SafeSafe</Link>               
                    <div className="text-xs text-gray-400 -mt-0.5">Your safety network</div>
                </div>
                <div className='flex items-center gap-3'>
                    {
                    user ? 
                    ( 
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-200 hover:text-white">Home</Link>
                        <Link to="/contacts" className="text-gray-400 hover:text-white">Contacts</Link>
                        <Link to="/dashboard" className="text-gray-200 hover:text-white">Dashboard</Link>
                        <Link to="/logout" className="text-gray-200 hover:text-white">Logout</Link>
                    </nav>
                    )
                    :                   
                   ( 
                     <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-700 font-semibold hover:text-gray-400">Home</Link>
                        <Link to="/dashboard" className="text-gray-700 font-semibold hover:text-gray-400">Dashboard</Link>
                        <Link to="/logout" className="text-gray-700 font-semibold hover:text-gray-400">Logout</Link>
                    </nav>
                   )
                    }
                </div>
            </div>
        </nav>
    </>
  )
}
