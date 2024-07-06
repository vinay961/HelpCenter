import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../Nav.jsx';
import './Main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom';

const MessagingComponent = () => {
  const [message, setMessage] = useState('');
  const [roomBooked, setRoomBooked] = useState(false);

  const location = useLocation();
  const { roomId } = location.state || {};

  const handleRoomBookedToggle = () => {
    setRoomBooked(!roomBooked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/messages', {
        message,
        roomBooked,
        roomId,
      });
      console.log('Message sent:', response.data);
      setMessage('');
      setRoomBooked(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800'>
      <Nav />
      <div className="max-w-lg p-4 bg-gray-200 rounded-lg shadow-md mt-20 messagebody">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome to Your Messaging Center!</h1>
        <p className="mb-4 text-center text-gray-700">We're here to help you connect with sellers. Feel free to send a message below.</p>
        
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            Send Message
          </button>
          <div className="flex items-center justify-center mt-6">
            <label htmlFor="roomBooked" className="mr-4 text-lg text-gray-600">Room Booked?</label>
            <input
              type="checkbox"
              id="roomBooked"
              className="form-checkbox h-6 w-6 text-blue-500 rounded-md border-gray-300 focus:ring-blue-400 focus:border-blue-400"
              checked={roomBooked}
              onChange={handleRoomBookedToggle}
            />
          </div>
        </form>
        
        <h2 className="text-xl mt-6 font-bold text-center text-gray-600">Or connect with them via WhatsApp or Phone:</h2>
        <hr className="border-t-2 border-gray-400 w-full max-w-lg mx-auto" />
        <div className="flex justify-center mt-2 gap-6 space-x-2">
          <a href="https://wa.me/8882674049" target="_blank" rel="noopener noreferrer" className="text-green-500 text-3xl bg-green-100 p-2 rounded-full shadow-lg">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="tel:+91888267409" className="text-blue-500 text-2xl bg-blue-100 p-2 rounded-full shadow-lg">
            <i className="fas fa-phone"></i>
          </a>
        </div>
        <hr className="border-t-2 border-gray-500 w-full max-w-lg mx-auto mt-2" />
      </div>
    </div>
  );
};

export default MessagingComponent;
