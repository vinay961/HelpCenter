import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', newPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                setTimeout(() => {
                    setIsForgotPassword(false);
                    setSuccess('');
                }, 2000);
            } catch (err) {
                console.error(err);
                setError('Failed to reset password');
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
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (err) {
                console.error(err);
                setError('Invalid email or password');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-8">
                {error && <div className="mb-4 text-red-500">{error}</div>}
                {success && <div className="mb-4 text-green-500 text-center">{success}</div>}

                {!isForgotPassword ? (
                    <>
                        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-6">Login</h2>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-700 py-2 px-3 text-black-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-700 py-2 px-3 text-black-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-between mb-4 gap-2">
                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-500 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => { navigate('/') }}
                            >
                                Back
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
                                onClick={() => setIsForgotPassword(true)}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold text-center text-gray-300 mb-6">Forgot Password</h2>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-black-700 py-2 px-3 text-black-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-300">New Password</label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-700 py-2 px-3 text-black-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-between mb-4 gap-2">
                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={handleSubmit}
                            >
                                Reset Password
                            </button>
                            <button
                                type="button"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-500 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

