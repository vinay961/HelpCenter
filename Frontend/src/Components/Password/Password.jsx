import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav.jsx';
import './Password.css';

const PasswordChange = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ oldpassword: '', newpassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('https://helpcenter-66d7.onrender.com/api/users/changepassword', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldpassword: formData.oldpassword, newpassword: formData.newpassword }),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
      setSuccess('Password changed successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Invalid old password');
    }
  };

  return (
    <>
      {/* <Nav /> */}
      <div className="flex items-center justify-center min-h-screen passwordbody">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          {success && <div className="mb-4 text-green-500 text-center">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-2">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldpassword"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.oldpassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newpassword"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.newpassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => { navigate('/'); }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;
