import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/rooms/userRoom',{
            withCredentials: true,
        });
        console.log(response.data.data)
        setRooms(response.data.data.room);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user rooms:', error);
        setLoading(false);
      }
    };

    fetchUserRooms();
  }, []);

  return (
    <div className="roompagebody mx-auto text-white">
      <div className="header-fixed">
        <h1 className="text-3xl font-bold">List of Added Rooms</h1>
      </div>
      <div className="roomlist-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : rooms.length === 0 ? (
          <p className='text-center font-bold mt-4' >No rooms found.</p>
        ) : (
          rooms.map((room) => (
            <div key={room._id} className="room-card shadow-md">
              <img src={room.roomImage} alt={room.title} className="room-image rounded" />
              <div className="room-details">
                <div className="header">
                  <span className="text-sm text-gray-400">{new Date(room.updatedAt).toLocaleString()}</span>
                  <span className="badge text-xs">{room.gender.toUpperCase()}</span>
                </div>
                <hr className="border-t-2 border-gray-300 mb-6 mt-2" />
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="leading-relaxed mb-4">{room.roomType === 'other' ? room.message : room.roomType}</p>
                <div className="user-info">
                  <img
                    src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                    alt={room.user.name}
                  />
                  <div>
                    <p className="user-name">{room.user.name.toUpperCase()}</p>
                    {/* Assuming room.user.role exists */}
                    <p className="user-role">{room.user.role}</p>
                  </div>
                </div>
                <p className="location">
                  <span className="font-bold">Location:</span> {room.area}, {room.district}
                </p>
                <p className="price">
                  <span className="font-bold">Price:</span> {room.price} per month
                </p>
                <div className="flex mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                        Edit Details
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
                        Delete Record
                    </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserRooms;
