import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav.jsx';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [updatedUser, setUpdatedUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        return {
            name: user.name,
            email: user.email
        };
    });

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                clearMessages();
            }, 2000); 

            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/users/updateprofile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updatedUser)
            });
            if (!response.ok) {
                return setError('Something went wrong from server.');
            }
            localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
            setSuccess('Profile updated successfully.');

            setTimeout(() => {
                setIsEditing(false);
            }, 2000);
        } catch (err) {
            setError('Failed to update the profile. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/users/deleteprofile', {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete profile');
            }

            localStorage.removeItem('loggedInUser');
            navigate('/');
        } catch (err) {
            setError('An error occurred while deleting the profile. Please try again.');
        }
    };

    const handleBack = () => {
        setIsEditing(false);
    };

    return (
        <>
          <Nav />
          <div className="max-w-lg mx-auto shadow-lg rounded-lg overflow-hidden mt-10 profilebody">
            {error && (
                <div className="bg-red-500 text-white text-center py-2 px-4 mb-4">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-500 text-white text-center py-2 px-4 mb-4">
                    {success}
                </div>
            )}
            {isEditing ? (
                <div className="mt-6 p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Update Profile</h2>
                    <div className="flex flex-col items-center">
                        <div className="mb-2 w-full">
                            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="p-2 border border-gray-300 rounded w-full"
                                type="text"
                                name="name"
                                id="name"
                                value={updatedUser.name}
                                onChange={handleInputChange}
                                placeholder="Username"
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="p-2 border border-gray-300 rounded w-full"
                                type="email"
                                name="email"
                                id="email"
                                value={updatedUser.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                            />
                        </div>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2 transform transition-transform duration-500 hover:scale-105"
                            onClick={handleUpdateProfile}
                        >
                            Save Changes
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transform transition-transform duration-500 hover:scale-105"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    </div>
                </div>
            ) : (
                <>
                  <div className="flex items-center justify-center bg-gray-900 p-6">
                    <img 
                        className="h-24 w-24 rounded-full object-cover" 
                        src='https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?rs=1&pid=ImgDetMain'
                        alt={`${user.name}'s avatar`}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-100">Name-{user.name}</h2>
                        <p className="text-xl text-gray-500">Role-{user.userType}</p>
                    </div>
                    <div className="mt-4">
                        <div className="text-center">
                            <p className="text-lg text-gray-200"><span className="font-semibold">Email:</span> {user.email}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-around">
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transform transition-transform duration-500 hover:scale-105">
                            Delete Profile
                        </button>
                        <button 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transform transition-transform duration-500 hover:scale-105"
                            onClick={() => setIsEditing(true)}
                        >
                            Update Profile
                        </button>
                    </div>
                  </div>
                </>
            )}
          </div>
        </>
    );
};

export default Profile;
