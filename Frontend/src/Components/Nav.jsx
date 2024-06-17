// src/Components/Nav.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
import logo from '../Images/logo.png';

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [userType, setUserType] = useState(null); // Add this state
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/checkauth', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.status === 200) {
          const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
          if (loggedInUser) {
            setUser(true);
            setUserType(loggedInUser.userType); // Set userType here
          }
        } else {
          localStorage.removeItem('loggedInUser');
          setUser(false);
          setUserType(null); // Reset userType
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('loggedInUser');
        setUser(false);
        setUserType(null); // Reset userType
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
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setShowDropdown(false);
      setAvatarClicked(false);

      if (response.status === 200) {
        localStorage.removeItem('loggedInUser');
        setUser(false);
        setUserType(null); // Reset userType
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

        {/* Navigation Links */}
        <div className="text-xl hidden md:flex space-x-7 ml-8 z-20">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact Me</a>
        </div>

        {/* Avatar and Dropdown */}
        <div className="relative z-20 ml-16" ref={dropdownRef}>
          {user && (
            <button
              onClick={handleDropdownToggle}
              className={`h-12 w-12 z-50 rounded-full overflow-hidden focus:outline-none transition-colors duration-300 ${avatarClicked ? 'border-4 border-green-800' : 'border-4 border-gray-200'}`}
            >
              <img src="https://th.bing.com/th/id/OIP.oU8cbOKSalCc7pchD_b4tAAAAA?w=474&h=474&rs=1&pid=ImgDetMain" alt="Avatar" className="h-full w-full object-cover z-30" />
            </button>
          )}
          {showDropdown && (
            <div className="absolute z-20 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-gray-300 ring-opacity-50">
              <button
                onClick={() => { navigate('/profile') }}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Profile
              </button>
              {user && userType === 'seller' && (
                <>
        
                  <button
                    onClick={() => { navigate('/rooms') }}
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Add Room Details
                  </button>
                  <button
                    onClick={() => { navigate('/userRooms') }}
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    View Added Rooms
                  </button>

                </>
              )}
              <button
                onClick={() => { navigate('/changepassword') }}
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

        {/* Login/Register Buttons */}
        {!user && (
          <div className="flex space-x-4">
            <a
              href="/login"
              className="text-gray-700 bg-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
              onClick={() => { navigate('/login') }}
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => { navigate('/register') }}
            >
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
