import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
     <footer className="bg-surfaceDark dark:bg-surfaceDark text-gray-300 px-8">
      <div className="px-4 mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-bold">SS</div>
            <div>
              <div className="text-white font-semibold">SafeSafe</div>
              <div className="text-xs text-gray-500">© {new Date().getFullYear()} SafeSafe</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:underline">Privacy</Link>
            <Link to="/" className="hover:underline">Terms</Link>
            <Link to="/" className="hover:underline">Support</Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-300 text-center">Built with care</div>
      </div>
    </footer>
  )
}

export default Footer