// src/Components/Nav.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
import logo from '../Images/logo.png';

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://helpcenter-66d7.onrender.com/api/users/checkauth', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.status === 200) {
          const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
          if (loggedInUser) {
            setUser(loggedInUser);
            setUserType(loggedInUser.userType);
          }
        } else {
          localStorage.removeItem('loggedInUser');
          setUser(null);
          setUserType(null); 
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('loggedInUser');
        setUser(null);
        setUserType(null); 
      }
    };

    checkAuth();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setAvatarClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch('https://helpcenter-66d7.onrender.com/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setShowDropdown(false);
      setAvatarClicked(false);

      if (response.status === 200) {
        localStorage.removeItem('loggedInUser');
        setUser(null);
        setUserType(null); 
        navigate('/');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown((prevState) => !prevState);
    setAvatarClicked((prevState) => !prevState);
  };

  return (
    <nav className="p-4 shadow-lg bg-gradient-to-r from-gray-100 to-gray-500 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto mr-3" />
        </div>

        {/* Avatar and Dropdown */}
        <div className="relative z-20 ml-16" ref={dropdownRef}>
          {user ? (
            <button
              onClick={handleDropdownToggle}
              className={`h-12 w-12 z-50 rounded-full overflow-hidden focus:outline-none transition-colors duration-300 ${avatarClicked ? 'border-4 border-gray-200' : 'border-4 border-gray-500'}`}
            >
              <img src={user.avatar} alt="Avatar" className="h-full w-full object-cover z-30" />
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                className="text-gray-700 bg-gray-300 hover:text-white hover:bg-red-700 px-3 py-2 rounded transition duration-300"
                onClick={() => { navigate('/login'); }}
              >
                Login
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => { navigate('/register'); }}
              >
                Register
              </button>
            </div>
          )}

          {showDropdown && (
            <div className="absolute z-20 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-gray-300 ring-opacity-50">
              <button
                onClick={() => { navigate('/profile'); }}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Profile
              </button>
              {userType === 'seller' && (
                <>
                  <button
                    onClick={() => { navigate('/rooms'); }}
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Add Room Details
                  </button>
                  <button
                    onClick={() => { navigate('/userRooms'); }}
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    View Added Rooms
                  </button>
                </>
              )}
              <button
                onClick={() => { navigate('/changepassword'); }}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
