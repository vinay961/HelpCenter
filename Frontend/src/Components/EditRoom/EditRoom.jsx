import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    roomImage: '',
    title: '',
    gender: '',
    roomType: '',
    message: '',
    area: '',
    district: '',
    price: '',
  });

  const [showMessageField, setShowMessageField] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (location.state && location.state.room) {
      setRoom(location.state.room);
      setShowMessageField(location.state.room.roomType === 'other');
    }
  }, [location.state]);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setRoom({
        ...room,
        roomImage: e.target.files[0],
      });
    } else {
      setRoom({
        ...room,
        [e.target.name]: e.target.value,
      });

      if (e.target.name === 'roomType' && e.target.value !== 'other') {
        setShowMessageField(false);
      } else if (e.target.name === 'message') {
        setShowMessageField(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('roomImage', room.roomImage);
      formData.append('gender', room.gender);
      formData.append('roomType', room.roomType);
      formData.append('message', room.message);
      formData.append('area', room.area);
      formData.append('district', room.district);
      formData.append('price', room.price);

      const response = await axios.put(`https://helpcenter-66d7.onrender.com/api/rooms/updateroom/${room._id}`, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setSuccessMessage('Room details updated successfully.');
        setTimeout(() => {
          navigate(-1); 
        }, 2000);
      } else {
        setErrorMessage('Failed to update room details.');
      }
    } catch (error) {
      console.error('Error updating room details:', error);
      setErrorMessage('Failed to update room details.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md m-5">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Room</h2>

        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p className="font-bold">Success</p>
            <p>{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="roomImage">
              Room Image
            </label>
            <input
              type="file"
              name="roomImage"
              id="roomImage"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="gender">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              id="gender"
              value={room.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {!showMessageField ? (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="roomType">
                  Room Type
                </label>
                <input
                  type="text"
                  name="roomType"
                  id="roomType"
                  value={room.roomType}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
                />
              </div>
            ) : (
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
                  Message
                </label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  value={room.message}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={room.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="area">
                Area
              </label>
              <input
                type="text"
                name="area"
                id="area"
                value={room.area}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="district">
                District
              </label>
              <input
                type="text"
                name="district"
                id="district"
                value={room.district}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
          >
            Update Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
