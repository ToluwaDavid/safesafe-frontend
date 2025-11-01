import React from 'react'
import { Link } from 'react-router-dom'

const Cta = () => {
  return (
     <section className="py-28 mt-20 bg-surfaceLight dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 text-center">
      <div className='mx-auto px-4'>
        <div className="rounded-lg px-6 items-center justify-between gap-4 ">
          <div>
            <h4 className="text-4xl font-bold text-textLight dark:text-textDark text-center">Ready to protect your circle?</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-8 text-center">Sign up now and get your safety network set up in minutes.</p>
          </div>

          <div className="flex justify-center items-center gap-4 text-center py-8 mt-4 ">
            <Link to="/register" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-brandDark px-4 py-4 transition">Create Account</Link>
            {/* <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 px-4 py-4">Contact Sales</Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta