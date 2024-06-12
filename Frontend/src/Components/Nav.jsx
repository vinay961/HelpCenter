import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
import logo from '../Images/logo.png';
// import avatarPlaceholder from '../Images/avatar-placeholder.png'; // Placeholder avatar image

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown menu

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setShowDropdown(false)

      if (response.status === 200) {
        localStorage.removeItem('loggedInUser');
        setUser(false);
        navigate('/'); // Redirect to home or login page after logout
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <nav className="p-4 shadow-lg bg-gradient-to-r from-gray-100 to-gray-500">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto mr-3" />
        </div>
        
        {/* Navigation Links */}
        <div className="text-xl hidden md:flex space-x-6">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact Me</a>
        </div>

        {/* Avatar and Dropdown */}
        <div className="relative">
          {user && (
            <button 
              onClick={handleDropdownToggle}
              className="h-12 w-12 rounded-full overflow-hidden focus:outline-none"
            >
              <img src="https://cdn2.f-cdn.com/contestentries/1440473/30778261/5bdd02db9ff4c_thumb900.jpg" alt="Avatar" className="h-full w-full object-cover" />
            </button>
          )}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-gray-300 ring-opacity-50 z-10">
              <button 
                onClick={() => { /* Handle Profile Option */ }}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Profile
              </button>
              <button 
                onClick={() => { /* Handle Change Password Option */ }}
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
              onClick={() => {navigate('/login')}} 
            >
              Login
            </a>
            <a 
              href="/register" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300" 
              onClick={() => {navigate('/register')}} 
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
