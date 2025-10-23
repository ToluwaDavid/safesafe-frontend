import React from 'react'
import { Link } from 'react-router-dom'

const Cta = () => {
  return (
     <section className="py-3 ">
      <div>
        <div className="rounded-lg px-6 items-center justify-between gap-4">
          <div>
            <h4 className="text-3xl font-bold text-blue-600 text-center">Ready to protect your circle?</h4>
            <p className="text-gray-400 text-sm mt-1 text-center">Sign up now and get your safety network set up in minutes.</p>
          </div>

          <div className="flex justify-center items-center gap-4 text-center py-8 ">
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 px-4 py-4">Create Account</Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 px-4 py-4">Contact Sales</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta