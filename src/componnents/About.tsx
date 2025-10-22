import React from 'react'

const Step = ({number, title, text} : {number: number, title:string, text:string}) =>(
    <div className='flex gap-4 items-start'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full font-bold text-blue-400   '>
            {number}
        </div>
        <div>
            <div className="font-semibold text-gray-700">{title}</div>
            <div className="text-gray-400 text-sm mt-1 text-center">{text}</div>
        </div>
    </div>
)

export default function About () {
  return (
    <section className='py-16'>
        <div className='mx-auto text-center'>
            <h3 className='text-3xl font-bold text-blue-600'>How it works</h3>
            <p className="mt-2 text-gray-400">Three simple steps to stay connected with people who matter.</p>

            <div className='mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6'>
                <div className='bg-bg.dark/40 p-5 rounded-lg'>
                    <Step number={1}  title="Register" text="Create a secure account with email and password."   />
                </div>

                <div className='bg-bg.dark/40 p-5 rounded-lg'>
                    <Step number={2}  title="Add trusted contacts" text="Add up to five people who will receive your location."   />
                </div>

                <div className='bg-bg.dark/40 p-5 rounded-lg'>
                    <Step number={3}  title="Send alert" text="Tap the emergency button to share your exact location."   />
                </div>  
            </div>
        </div>
    </section>
  )
}
