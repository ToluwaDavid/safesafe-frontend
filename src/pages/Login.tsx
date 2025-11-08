import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    theme: 'light' | 'dark';
    setTheme: (t: 'light' | 'dark') => void;
}

const Login: React.FC<Props> = ({ theme, setTheme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate login validation
                    if (email === 'demo@example.com' && password === 'password') {
                        resolve(true);
                    } else {
                        reject(new Error('Invalid email or password'));
                    }
                }, 1000);
            });

            // Success - navigate to dashboard
            navigate('/dashboard');
            
        } catch (err: any) {
            setLoading(false);
            setError(err?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-bgLight dark:bg-bgDark py-8 flex items-center justify-center">
            <div className="max-w-md w-full mx-4">
                <form onSubmit={handleSubmit} className="bg-surfaceLight dark:bg-surfaceDark border border-gray-200 dark:border-gray-700 p-8 rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-textLight dark:text-textDark mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Sign in to your safety account
                        </p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    {/* Demo Credentials Hint */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            <strong>Demo credentials:</strong><br />
                            Email: demo@example.com<br />
                            Password: password
                        </p>
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                            Email Address *
                        </label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent" 
                            required 
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-textLight dark:text-textDark">
                            Password *
                        </label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-textLight dark:text-textDark focus:ring-2 focus:ring-primary focus:border-transparent" 
                            required 
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-brandDark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing In...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    {/* Register Link */}
                    <div className="text-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary font-semibold hover:underline">
                                Create one here
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;