import React, { useState,useEffect } from 'react';
import MessageInput from './Input.jsx';
import MessageList from './List.jsx';
import Nav from '../Nav.jsx'
import './Main.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const MessagingComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  })

  const fetchMessages = async() => {
    try {
      const response = await axios.get()
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }

const handleSendMessage = async(messageText) => {
    const userJSON = localStorage.getItem('loggedInUser');
    const user = JSON.parse(userJSON);

    if (user && user.name) {
        const newMessage = {
        text: messageText,
        sender: user.name,
        };
        setMessages([...messages, newMessage]);
    } else {
        console.error('User not found or user name is missing');
    }

    try {
      const response = await axios.post()
      setMessages([...messages,response.data]);
    } catch (error) {
      console.log(error);
    }

};

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800'>
      <Nav />
      <div className="max-w-lg p-4 bg-gray-200 rounded-lg shadow-md mt-20 messagebody">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome to Your Messaging Center!</h1>
        <p className="mb-4 text-center text-gray-700">We're here to help you connect with sellers. Feel free to send a message below.</p>
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
        <div className="flex items-center justify-center mt-6">
          <label htmlFor="roomBooked" className="mr-4 text-lg text-gray-600">Room Booked?</label>
          <input
            type="checkbox"
            id="roomBooked"
            className="form-checkbox h-6 w-6 text-blue-500 rounded-md border-gray-300 focus:ring-blue-400 focus:border-blue-400"
            // checked={roomBooked}
            // onChange={handleRoomBookedToggle}
          />
        </div>
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
