import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-blue-600">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg">
          SafeSafe
          <div className="text-xs text-gray-500 -mt-0.5">Your safety network</div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          {user && (
            <>
              <Link to="/contacts" className="text-gray-700 hover:text-blue-600">Contacts</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="text-red-600 font-medium hover:underline"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md border border-gray-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden px-4 pb-3 border-t">
          <div className="flex flex-col gap-4 mt-3">
            <Link onClick={() => setOpen(false)} to="/" className="text-gray-700">
              Home
            </Link>
            {user && (
              <>
                <Link onClick={() => setOpen(false)} to="/contacts" className="text-gray-700">
                  Contacts
                </Link>
                <Link onClick={() => setOpen(false)} to="/dashboard" className="text-gray-700">
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
                <Link onClick={() => setOpen(false)} to="/login" className="text-gray-700">
                  Login
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
