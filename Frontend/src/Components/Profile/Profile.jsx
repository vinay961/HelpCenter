import React from 'react';
import Nav from '../Nav.jsx';
import './Profile.css'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    return (
        <>
          <Nav />
          <div className="max-w-lg mx-auto  shadow-lg rounded-lg overflow-hidden mt-10 transform transition-transform duration-500 hover:scale-105 profilebody">
            <div className="flex items-center justify-center bg-gray-900 p-6">
                <img 
                    className="h-24 w-24 rounded-full object-cover" 
                    src='https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?rs=1&pid=ImgDetMain'
                    alt={`${user.name}'s avatar`}
                />
            </div>
            <div className="p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-xl text-gray-500">{user.userType}</p>
                </div>
                <div className="mt-4">
                    <div className="text-center">
                        <p className="text-lg text-gray-600"><span className="font-semibold">Email:</span> {user.email}</p>
                    </div>
                </div>
            </div>
          </div>
        </>
    );
};

export default Profile;
