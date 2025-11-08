import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    theme: 'light' | 'dark';
    setTheme: (t: 'light' | 'dark') => void;
}

// Interface for emergency contact data
interface EmergencyContact {
    firstName: string;
    lastName: string;
    phone: string;
    relationship: string;
}

const Register: React.FC<Props> = ({ theme, setTheme }) => {
    // User basic info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Emergency contacts using better data structure
    const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
        { firstName: '', lastName: '', phone: '', relationship: '' },
        { firstName: '', lastName: '', phone: '', relationship: '' }
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Update emergency contact field
    const updateEmergencyContact = (index: number, field: keyof EmergencyContact, value: string) => {
        const updatedContacts = [...emergencyContacts];
        updatedContacts[index] = {
            ...updatedContacts[index],
            [field]: value
        };
        setEmergencyContacts(updatedContacts);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Validate emergency contacts
            const validContacts = emergencyContacts.filter(contact => 
                contact.firstName && contact.lastName && contact.phone
            );

            if (validContacts.length === 0) {
                throw new Error('Please add at least one emergency contact');
            }

            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate 10% chance of error for demo
                    if (Math.random() < 0.1) {
                        reject(new Error('Registration failed. Please try again.'));
                    } else {
                        resolve(true);
                    }
                }, 1500);
            });

            // Success - navigate to login
            navigate('/login');
            
        } catch (err: any) {
            setLoading(false);
            setError(err?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-bgLight dark:bg-bgDark py-8">
            <div className="max-w-2xl mx-auto px-4">
                <form onSubmit={handleSubmit} className="bg-surfaceLight dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-textLight dark:text-textDark mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Join our safety network
                        </p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    {/* Personal Information Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-textLight dark:text-textDark mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                            Personal Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                                    Full Name *
                                </label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)} 
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent" 
                                    required 
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                                    Email Address *
                                </label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent" 
                                    required 
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                                    Password *
                                </label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)} 
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent" 
                                    required 
                                    minLength={6}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contacts Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-textLight dark:text-textDark mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                            Emergency Contacts
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Your emergency contacts will be notified during emergency situations. At least one contact is required.
                        </p>

                        {emergencyContacts.map((contact, index) => (
                            <div key={index} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <h4 className="font-semibold text-textLight dark:text-textDark mb-4">
                                    Contact {index + 1} {index === 0 && '(Required)'}
                                </h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                                            First Name *
                                        </label>
                                        <input 
                                            type="text" 
                                            value={contact.firstName}
                                            onChange={e => updateEmergencyContact(index, 'firstName', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required={index === 0}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                                            Last Name *
                                        </label>
                                        <input 
                                            type="text" 
                                            value={contact.lastName}
                                            onChange={e => updateEmergencyContact(index, 'lastName', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required={index === 0}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                                            Phone Number *
                                        </label>
                                        <input 
                                            type="tel" 
                                            value={contact.phone}
                                            onChange={e => updateEmergencyContact(index, 'phone', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required={index === 0}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                                            Relationship *
                                        </label>
                                        <input 
                                            type="text" 
                                            value={contact.relationship}
                                            onChange={e => updateEmergencyContact(index, 'relationship', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required={index === 0}
                                            placeholder="e.g., Parent, Spouse, Friend"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-brandDark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Already registered?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Sign in to your account
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;