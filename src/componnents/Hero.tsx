import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="py-32 bg-bgLight  dark:bg-bgDark">
      <div className='container mx-auto px-4 text-center'>
        <div className="max-w-3xl mx-auto leading-9">
            <h1 className="text-5xl sm:text-5xl font-extrabold text-primary dark:text-textDark leading-12">
            SafeSafe — 
          </h1>
          <h1 className="text-5xl sm:text-5xl font-extrabold text-textLight dark:text-textDark leading-12 mt-4">
             Your <span className='text-primary'>safety, </span>simplified.
          </h1>
           <p className="mt-8 text-gray-600 dark:text-gray-400">
            Create a trusted circle of up to five people. If you’re lost or in danger, send your exact location to them instantly via SMS or email.
          </p>

          <div className='mt-8 flex justify-center gap-4'>
               <Link to="/register" className="px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-brandDark transition">
              Create Free Account
            </Link>
          </div>

           <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-2">🔒 Encrypted • 🔔 Real-time • 🚫 No spam</span>
          </div>
        </div>
      </div>
    {/* <section className="text-white text-center py-32 p-4"> */}
        {/* <div className='text-center mt-10'>
             <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight ">SafeSafe — Your safety, simplified.</h1>
            <p className="mt-4  w-3/4 text-center mx-auto pt-4">Create a trusted circle of up to five people. If you’re lost or in danger, send your exact location to them instantly via SMS or email.</p>
            <div className='mt-4  flex justify-center pt-4'>
                <Link to="/register" className='px-4 py-4 rounded-md bg-white text-[#00A9FF] w-[200px]  font-semibold'>Create Free Account</Link>
            </div>
             <div className="mt-6 text-sm text-gray-400 pt-4">
              <span className="inline-flex items-center gap-2 text-white">🔒 Encrypted • 🔔 Real-time • 🚫 No spam</span>
            </div>
        </div> */}

      {/* <div className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">SafeCircle — Your safety, simplified.</h1>
            <p className="mt-4 text-gray-300 max-w-xl">Create a trusted circle of up to five people. If you’re lost or in danger, send your exact location to them instantly via SMS or email.</p>

            <div className="mt-8 flex items-center gap-3">
              <button  className="px-6 py-3">Create Free Account</button>
              <button  className="px-5 py-3">Learn more</button>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2">🔒 Encrypted • 🔔 Real-time • 🚫 No spam</span>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="w-[360px] h-[560px] rounded-2xl bg-black/40 border border-gray-800 shadow-inner p-4 flex flex-col">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>SafeCircle</span>
                <span>Live · Secure</span>
              </div>

              <div className="mt-6 bg-gradient-to-br from-black/40 to-white/5 rounded-lg p-3 flex-1">
                <div className="text-xs text-gray-400">Recent alert</div>
                <div className="mt-3 bg-gray-900 rounded p-3 text-sm">
                  <div className="font-medium">You sent an emergency</div>
                  <div className="text-xs text-gray-500 mt-2">Sent to 4 contacts • 2 minutes ago</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">Preview of mobile UI</div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
