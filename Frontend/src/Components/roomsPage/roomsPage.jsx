import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './roomsPage.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleBook = (roomId) => {
    const user = localStorage.getItem('loggedInUser');

    if (user) {
      navigate('/book', { state: { roomId } });
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/rooms/getrooms');
        const sortedRooms = response.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        // console.log(sortedRooms);
        setRooms(sortedRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="roompagebody mx-auto text-white">
      <div className="header-fixed">
        <h1 className="text-3xl font-bold">Available Rooms</h1>
      </div>
      <div className="roomlist-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="room-card shadow-md">
            <img src={room.roomImage} alt={room.title} className="room-image rounded" />
            <div className="room-details">
              <div className="header">
                <span className="text-sm text-gray-400">{new Date(room.updatedAt).toLocaleString()}</span>
                <span className="badge text-xs"> {room.gender.toUpperCase()} </span>
              </div>
              <hr className="border-t-2 border-gray-300 mb-6 mt-2" />
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="leading-relaxed mb-4"> {room.roomType === "other" ? room.message : room.roomType} </p>
              <div className="user-info">
                <img src='https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png' alt={room.user.name} />
                <div>
                  <p className="user-name">{room.user.name.toUpperCase()}</p>
                  <p className="user-role">{room.user.role}</p>
                </div>
              </div>
              <p className="location"><span className='font-bold'>Location:</span> {room.area}, {room.district}</p>
              <p className="price"><span className='font-bold'>Price:</span> {room.price} per month</p>
              <button className="button" onClick={() => handleBook(room.id)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
