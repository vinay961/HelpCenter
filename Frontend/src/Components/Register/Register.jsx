import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-600">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="border-b border-gray-300 pb-4 mb-4">
                    <h2 className="text-3xl font-semibold leading-7 text-gray-900">Register</h2>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-700">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="userType" className="block text-sm font-medium leading-6 text-gray-700">User Type</label>
                        <select
                            id="userType"
                            name="userType"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="search">Seeker</option>
                            <option value="sell">Seller</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex justify-between space-x-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-500 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => { navigate('/') }}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
