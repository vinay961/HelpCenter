import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav.jsx';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Testimonial from "../Components/Testimonial/Testimonial.jsx";
import './Home.css';

function Home() {
  const [user, setUser] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

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
            setUserType(loggedInUser.userType); // Assuming userType is stored in local storage
          }
        } else {
          localStorage.removeItem('loggedInUser');
          setUser(false);
          setUserType(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('loggedInUser');
        setUser(false);
        setUserType(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center body">
        <h1 className="text-3xl font-bold mb-6 mt-16">Discover Rooms by Location</h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter location"
            className="px-4 py-2 w-64 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search
          </button>
          {user && userType === 'seller' && (
            <button
              onClick={() => { navigate('/rooms') }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add Room Details
            </button>
          )}
        </div>
        <Testimonial />
        <footer className="flex flex-col items-center justify-center text-center text-gray-600 text-m mt-auto p-4">
          <div className="flex">
            <a href="https://github.com/vinay961" target="_blank" rel="noopener noreferrer" className="mr-4">
              <FaGithub size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mr-4">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.linkedin.com/in/vinay-rai-ab53452a6/" target="_blank" rel="noopener noreferrer" className="mr-4">
              <FaLinkedin size={24} />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Software_Services Pvt. Ltd. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default Home;
