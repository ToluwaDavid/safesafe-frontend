import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const Navbar: React.FC<NavbarProps> = ({theme , setTheme}) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () =>{
    setTheme(theme === 'dark' ? 'light' : 'dark' )
  }

  return (
    <nav className={`transition-colors duration-300 border-b shadow-sm ${theme === 'dark'
        ? 'bg-surfaceDark border-gray-700 text-textDark'
        : 'bg-white border-blue-300 text-white' }`}>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg text-primary">
          SafeSafe
          <div className="text-xs -mt-0.5 text-primary">Your safety network</div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-primary hover:opacity-80">Home</Link>
          {user && (
            <>
              <Link to="/contacts" className="hover:opacity-80">Contacts</Link>
              <Link to="/dashboard" className="hover:opacity-80">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="text-red-400 font-medium hover:underline"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="hover:opacity-80 text-primary">Login</Link>
              <Link
                to="/register"
                className={` px-4 py-2 rounded-md font-medium transition ${theme === 'dark'  ? 'bg-primary text-white hover:bg-brandDark': 'bg-primary text-white hover:bg-blue-100'}`}
              >
                Get Started
              </Link>
            </>
          )}

           <button 
          onClick={toggleTheme}
          // className={`border rounded-md px-4  py-2 text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? ' text-yellow-300 border-yellow-400 hover:bg-gray-900': 'bg-blue-50 text-gray-800 hover:bg-blue-100' }`}
          className="p-2 font-bold rounded-lg bg-gray-200 dark:bg-gray-700 text-textLight dark:text-textDark"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button> 

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md border border-gray-300 text-primary"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-3 border-t border-white ">
          <div className="flex flex-col gap-4 mt-3">
            <Link onClick={() => setOpen(false)} to="/" className="text-primary hover:opacity-80"> 
              Home
            </Link>
            {user && (
              <>
                <Link onClick={() => setOpen(false)} to="/contacts" className="text-primary hover:opacity-80">
                  Contacts
                </Link>
                <Link onClick={() => setOpen(false)} to="/dashboard" className="text-primary hover:opacity-80">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="text-red-600"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link onClick={() => setOpen(false)} to="/login" className="text-primary hover:opacity-80">
                  Login
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/register"
                  className={` px-4 py-2 rounded-md font-medium transition ${theme === 'dark'  ? 'bg-primary text-white hover:bg-[#0090E0]': 'bg-primary text-white hover:bg-blue-100'}`}
                >
                  Get Started
                </Link>
              </>
            )}
             <button 
          onClick={toggleTheme}
          className={`border rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? ' border-yellow-400 hover:bg-yellow-400 hover:text-gray-900': 'text-gray-800 border-gray-200 hover:bg-gray-100' }`}
          >
            {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
          </button> 

          
          </div>
        </div>
      )}
    </nav>
  );
};
