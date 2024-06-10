import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-200">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="flex justify-between mb-4 gap-2">
                    <button
                        type="button"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                    <a
                        href="/forgot-password"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
