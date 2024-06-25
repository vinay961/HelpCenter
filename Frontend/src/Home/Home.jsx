// src/Pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Components/Nav.jsx';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Testimonial from "../Components/Testimonial/Testimonial.jsx";
import About from "../About/About.jsx";
import './Home.css';

function Home() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim() !== '') {
      navigate(`/filter/${location}`);
    }
  };

  return (
    <>
      <div className='body flex flex-col min-h-screen'>
        <Nav />
        <div className="flex flex-col items-center flex-grow">
          <h1 className="text-3xl font-bold mb-6 mt-16 text-center">Discover Rooms by Location</h1>
          <div className="flex flex-col sm:flex-row gap-2 mb-6 flex-wrap justify-center">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 w-64 border text-center border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSearch}
              type="button"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search
            </button>
            <button
              onClick={() => { navigate('/homelist') }}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Rooms List
            </button>
          </div>
          <Testimonial />
        </div>
        <footer className="flex flex-col items-center justify-center text-center text-gray-600 text-m p-4">
          <div className="flex justify-center mb-4">
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
