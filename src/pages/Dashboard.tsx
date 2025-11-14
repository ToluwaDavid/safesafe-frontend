import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;

}

const Dashboard : React.FC<Props>  = ({theme, setTheme}) => {

  const [emergencyMode, setEmergrncyMode] = useState(false);
  const navigate = useNavigate();

  const triggerEmergency = () =>{
    setEmergrncyMode(true);
    alert('🆘 Emergency alert sent to your contacts!');

    setTimeout(() => {
      setEmergrncyMode(false);
    }, 4000);
  }


  //Handle LogOut
  const handleLogout = () =>{
    //Clear auth token from the app
    localStorage.removeItem('Token')
    navigate('/login')
  }

  return (
    <>
      <div className='min-h-screen bg-bgLight dark:bg-bgDark'>
        <header className='bg-surfaceLight dark:bg-surfaceDark border-b border-gray-200 dark:border-gray-700' >
          <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
             <h1 className="text-2xl font-bold text-textLight dark:text-textDark">
              SafeSafe  
            </h1>
            <div className='flex items-center space-x-4'>
              <button onClick={()=> setTheme(theme === 'light' ? 'dark' : 'light' )} className='p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-textLight dark:text-textDark'>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
              <button onClick={handleLogout} className='px-4 py-2 text-sm  bg-red-500 text-white rounded-lg hover:bg-red-00 transition'>
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className='bg-surfaceLight dark:bg-surfaceDark rounded-lg p-4 mb-8  border border-gray-200 dark:border-gray-700'>
            <h2 className="text-2xl font-semibold text-textLight dark:text-textDark mb-2">Welcome back, </h2>
             <p className="text-gray-600 dark:text-gray-400">
              Your safety is our priority. You're currently protected.
            </p>
          </div>

          <div className="text-center mb-8">
            <button onClick={triggerEmergency} disabled={emergencyMode} className={`px-12 py-4 text-2xl font-bold rounded-lg transition-all duration-300 ${ emergencyMode ? 'bg-red-600 text-white animate-pulse' : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105' } disabled:opacity-50 disabled:cursor-not-allowed`}>
                {emergencyMode ? '🆘 HELP SENT!' : '🆘 SEND EMERGENCY'}
            </button>
            <p className='mt-4 text-sm text-gray-600 dark:text-gray-400'>{ emergencyMode ? 'Your contacts have been notified. Help is on the way! ' : 'Press in case of emergency'}</p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-surfaceLight dark:bg-surfaceDark p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-3xl mb-3">📞</div>
                  <h3 className="font-semibold text-textLight dark:text-textDark mb-2">Quick Call</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Call emergency services</p>
                  <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-brandDark transition">
                    Call 911
                  </button>
            </div>


            <div className="bg-surfaceLight dark:bg-surfaceDark p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-textLight dark:text-textDark mb-2">Share Location</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Share your current location</p>
              <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Share Now
              </button>
            </div>

            <div className="bg-surfaceLight dark:bg-surfaceDark p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-semibold text-textLight dark:text-textDark mb-2">Contacts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Manage emergency contacts</p>
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                View Contacts
              </button>
            </div>





          </div> */}

          <div className='bg-surfaceLight dark:bg-surfaceDark rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
            <h3 className='text-xl font-semibold text-textLight dark:text-textDark mb-4'>Status</h3>

            <div className='space-y-3'>

              <div className="flex justify-between items-center">
                <span className="text-textLight dark:text-textDark">Location Tracking</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm">Active</span>
              </div> 

              <div className="flex justify-between items-center">
                <span className="text-textLight dark:text-textDark">Emergency Contacts</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm">2 Registered</span>
              </div>

               <div className="flex justify-between items-center">
                <span className="text-textLight dark:text-textDark">Last Check-in</span>
                <span className="text-gray-600 dark:text-gray-400">Just now</span>
              </div>
              

            </div>
          </div>

          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard