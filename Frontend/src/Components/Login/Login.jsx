import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', newPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    let timeoutId;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const clearMessages = () => {
        timeoutId = setTimeout(() => {
            setError('');
            setSuccess('');
        }, 2000);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutId); 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isForgotPassword) {
            // Handle forgot password logic
            try {
                const response = await fetch('http://localhost:8000/api/users/resetpassword', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, newpassword: formData.newPassword })
                });

                if (!response.ok) {
                    throw new Error('Failed to reset password');
                }

                setSuccess('Password has been reset successfully.');
                clearMessages();
                setTimeout(() => {
                    setIsForgotPassword(false);
                    setSuccess('');
                }, 2000);
            } catch (err) {
                console.error(err);
                setError('Failed to reset password');
                clearMessages();
            }
        } else {
            // Handle login logic
            try {
                const response = await fetch('http://localhost:8000/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const responseData = await response.json();
                localStorage.setItem('loggedInUser', JSON.stringify(responseData.data.user));
                setSuccess('Login successful! Redirecting to Dashboard...');
                clearMessages();
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } catch (err) {
                console.error(err);
                setError('Invalid email or password');
                clearMessages();
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center loginbody">
            <div className="max-w-md w-full bg-gray-300 rounded-lg shadow-lg p-8">
                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                {success && <div className="mb-4 text-green-500 text-center">{success}</div>}

                {!isForgotPassword ? (
                    <>
                        <h2 class="mt-2 mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="flex justify-between mb-4 gap-2">
                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => { navigate('/') }}
                            >
                                Back
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                className="text-sm font-medium text-indigo-400 hover:text-indigo-700"
                                onClick={() => setIsForgotPassword(true)}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Forgot Password</h2>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="flex justify-between mb-4 gap-2">
                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                onClick={handleSubmit}
                            >
                                Reset Password
                            </button>
                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => setIsForgotPassword(false)}
                            >
                                Back to Login
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
