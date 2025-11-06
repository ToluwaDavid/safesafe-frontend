import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    theme: 'light' | 'dark';
    setTheme: (t: 'light' | 'dark') => void;
}


const Register: React.FC<Props> = ({theme, setTheme}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [phoneone, setPhoneone] = useState('');
    const [phonetwo, setPhonetwo] = useState('');  
    const [emergencycontactonefirstname, setEmergencycontactonefirstname] = useState('');
    const [emergencycontactonelastname, setEmergencycontactonelastname] = useState('');   
    const [emergencycontacttwofirstname, setEmergencycontacttwofirstname] = useState('');
    const [emergencycontacttwolastname, setemergencycontacttwolastname] = useState('') 
    const [relationshipone, setRelationshipone] = useState('');  
    const [relationshiptwo, setRelationshiptwo] = useState('');                                                                    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null >(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {

            setTimeout(() =>{
                setLoading(false);
                navigate('/');
            }, 900)
            
        } catch (error : any) {
            setLoading(false);
            setError(error?.message || 'Registration failed' );
        }
    }
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
       <form onSubmit={handleSubmit} className="max-w-md w-full bg-surfaceLight dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 p-6 rounded-md shadow-sm mt-14" >
            <h2 className="text-2xl font-bold text-textLight dark:text-textDark mb-4 underline underline-offset-8 decoration-primary    ">Create Account</h2>

            {error && <div className="text- red-500 mb-3">{error}</div> }
            <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Full name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mb-3 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark" required />   
            
            <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark" required />   

            <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark" required />   
            

            <h3 className='font-bold text-textLight dark:text-textDark mb-2 underline underline-offset-8 decoration-primary mt-7 '>Add Emergency Contact</h3>
            <p className='text-xs'>Your emergency contacts will be notified dudring emergency periods </p>
            


            <h4 className='underline underline-offset-8 decoration-primary font-bold text-textLight dark:text-textDark  mt-4'>Contact 1</h4>
            <div>
                 <div className='flex space-x-3 mt-2   '>
                <div className='w-1/2'>
                    <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >First Name</label>
                    <input type="text" value={emergencycontactonefirstname} onChange={e => setEmergencycontactonefirstname(e.target.value)} className=' mb-3 px-2 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark ' />
                </div>
                <div className='w-1/2'>
                    <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Last Name</label>
                    <input type="text" value={emergencycontactonelastname} onChange={ e => setEmergencycontactonelastname(e.target.value)} className=' mb-3 px-2 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark ' />
                </div>  
                 </div>

                <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Phone number</label>
                <input type="telephone" value={phoneone} onChange={e => setPhoneone(e.target.value)} className="w-full mb-3 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark" required />   
                
                <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Relationship</label>
                <input type="text" value={relationshipone} onChange={e => setRelationshipone(e.target.value)} className="w-full mb-3 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark" required />   
            </div>


            <h3 className='underline underline-offset-8 decoration-primary font-bold text-textLight dark:text-textDark  mt-4'>Contact 2  </h3>
            <div>
                <div className='flex space-x-3 mt-2  '>
                    <div className='w-1/2'>
                        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >First Name</label>
                        <input type="text" value={emergencycontacttwofirstname} onChange={ e => setEmergencycontacttwofirstname(e.target.value)} className=' mb-3 px-2 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark ' />
                    </div>
                    <div className='w-1/2'>
                        <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Last Name</label>
                        <input type="text" value={emergencycontacttwolastname} onChange={ e => setemergencycontacttwolastname(e.target.value)} className=' mb-3 px-2 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark ' />
                    </div>  
                </div>

                <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Phone number</label>
                <input type="telephone" value={phonetwo} onChange={e => setPhonetwo(e.target.value)} className="w-full mb-3 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark" required />   
                
                <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold" >Relationship</label>
                <input type="text" value={relationshiptwo} onChange={e => setRelationshiptwo(e.target.value)} className="w-full mb-3 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-textLight dark:text-textDark" required />   
            

            </div>

           
            <button type="submit" disabled={loading} className="w-full py-2 rounded bg-primary text-white hover:bg-brandDark transition mt-8">
                {loading ? 'Creating...' : 'Create Account'}
            </button>

             <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Already registered? <Link to="/login" className="text-primary font-bold">Sign in</Link>
        </div>
       </form>
    </div>
  )
}

export default Register