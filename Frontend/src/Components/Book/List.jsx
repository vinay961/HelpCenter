import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <ul className="space-y-4 max-h-80 overflow-y-auto">
      {messages.map((msg, index) => (
        <li key={index} className={`p-4 rounded-md ${msg.sender === 'seeker' ? 'bg-green-100' : 'bg-gray-100'}`}>
          <div className="font-semibold capitalize">{msg.sender}</div>
          <div>{msg.text}</div>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
