import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav.jsx';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar
        };
    });

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')));

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar') {
            const file = files[0];
            setUpdatedUser(prevState => ({
                ...prevState,
                avatar: file
            }));
            setAvatarPreview(URL.createObjectURL(file));
        } else {
            setUpdatedUser(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
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
            const formData = new FormData();
            for (const key in updatedUser) {
                formData.append(key, updatedUser[key]);
            }

            const response = await fetch('https://helpcenter-66d7.onrender.com/api/users/updateprofile', {
                method: 'PUT',
                credentials: 'include',
                body: formData
            });

            if (!response.ok) {
                return setError('Something went wrong from server.');
            }

            const updatedUserResponse = await response.json();
            // console.log(updatedUserResponse);
            localStorage.setItem('loggedInUser', JSON.stringify(updatedUserResponse));
            setSuccess('Profile updated successfully.');
            const currUser = localStorage.getItem('loggedInUser')
            console.log(currUser);
            setUser(currUser); 

            setTimeout(() => {
                setIsEditing(false);
            }, 2000);
        } catch (err) {
            setError('Failed to update the profile. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('https://helpcenter-66d7.onrender.com/api/users/deleteprofile', {
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

    const triggerFileInput = () => {
        document.getElementById('avatarInput').click();
    };

    return (
        <div className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 pb">
          {/* <Nav /> */}
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
                    <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">Update Profile</h2>
                    <div className="flex flex-col items-center">
                        <img
                            className="h-24 w-24 mb-4 rounded-full object-cover cursor-pointer border-2 border-white"
                            src={avatarPreview || user.avatar}
                            alt={`${user.name}'s avatar`}
                            onClick={triggerFileInput}
                        />
                        <input
                            id="avatarInput"
                            type="file"
                            name="avatar"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleInputChange}
                        />
                        
                        <div className="mb-2 w-full">
                        <hr className="border-t-2 border-gray-300 mb-6" />
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
                        <div  className='mt-6 btn'>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transform transition-transform duration-500 hover:scale-105"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transform transition-transform duration-500 hover:scale-105"
                                onClick={handleUpdateProfile}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                  <div className="profile-header">
                    <img 
                        className="h-24 w-24 rounded-full object-cover border-2 border-white" 
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                    />
                  </div>
                  <hr className="border-t-2 border-gray-300 mb-6" />
                  <div className="profile-content">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-100">Name: {user.name}</h2>
                        <p className="text-xl text-gray-500">Role: {user.userType}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-lg text-gray-200"><span className="font-semibold">Email:</span> {user.email}</p>
                    </div>
                    <div className="mt-6 profile-actions">
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
        </div>
    );
};

export default Profile;
