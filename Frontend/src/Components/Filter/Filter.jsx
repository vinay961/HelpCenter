import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FilteredRooms() {
  const { location } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const locationParts = location.split(',').map(part => part.trim());
      let allRooms = [];

      for (let part of locationParts) {
        try {
          const response = await fetch(`https://helpcenter-66d7.onrender.com/api/rooms/filterRoom?location=${encodeURIComponent(part)}`);
          const data = await response.json();
          allRooms = [...allRooms, ...data.data.uniqueRooms];
          console.log(allRooms);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      }

      const uniqueRoomsMap = new Map();
      allRooms.forEach(room => {
        if (!uniqueRoomsMap.has(room._id)) {
          uniqueRoomsMap.set(room._id, room);
        }
      });

      // Convert Map back to an array
      const uniqueRooms = Array.from(uniqueRoomsMap.values());

      setRooms(uniqueRooms);
      console.log(rooms);
      setLoading(false);
    };

    fetchRooms();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="roompagebody mx-auto text-white">
      <div className="header-fixed">
        <h1 className="text-3xl font-bold">Rooms in {location}</h1>
      </div>
      <div className="roomlist-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {rooms.length > 0 ? (
          rooms.map(room => (
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
                <button className="button">Book Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg mt-8">No rooms found for {location}</p>
        )}
      </div>
    </div>
  );
}

export default FilteredRooms;
