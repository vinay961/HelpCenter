import React, { useState,useEffect } from 'react';
import MessageInput from './Input.jsx';
import MessageList from './List.jsx';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome to Your Messaging Center!</h1>
        <p className="mb-4 text-center text-gray-700">We're here to help you connect with sellers. Feel free to send a message below.</p>
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default MessagingComponent;
