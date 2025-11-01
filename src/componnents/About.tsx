import React from 'react'

const Step = ({number, title, text} : {number: number, title:string, text:string}) =>(
    <div className='flex gap-4 items-start py-9'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full font-bold bg-primary text-white font-bold   '>
            {number}
        </div>
        <div className='flex-1'>
            <div className="font-semibold text-gray-600 text-xl text-textLight dark:text-textDark">{title}</div>
            <div className="text-gray-600 text-sm mt-1 text-center dark:text-gray-400">{text}</div>
        </div>
    </div>
)

export default function About () {
  return (
    <section className=''>
        <div className='mx-auto text-center'>
            <h3 className='text-3xl font-bold text-primary mt-12'>How it works</h3>
            <p className="text-gray-600 mt-8 dark:text-gray-400">Three simple steps to stay connected with people who matter.</p>

            <div className='mt-9 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 px-8 py-12'>
                <div className='bg-surfaceLight dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 p-5 shadow-md rounded-lg'>
                    <Step number={1}  title="Register" text="Create a secure account with email and password."   />
                </div>

                <div className='bg-surfaceLight dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 p-5 shadow-md rounded-lg'>
                    <Step number={2}  title="Add trusted contacts" text="Add up to five people who will receive your location."   />
                </div>

                <div className='bg-surfaceLight dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 p-5 shadow-md rounded-lg'>
                    <Step number={3}  title="Send alert" text="Tap the emergency button to share your exact location."   />
                </div>  
            </div>
        </div>
    </section>
  )
}
