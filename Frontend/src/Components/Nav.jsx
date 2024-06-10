import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Nav.css'
import logo from '../Images/logo.png';

const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="p-4 shadow-lg bg-gradient-to-r from-gray-100 to-gray-500">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto mr-3" />
        </div>
        
        {/* Navigation Links */}
        <div class="text-xl hidden md:flex space-x-6">
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact Me</a>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <a href="/login" className="text-gray-700 bg-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition duration-300" onClick={() => {navigate('/login')}} >Login</a>
          <a href="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300" onClick={() => {navigate('/register')}} >Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
