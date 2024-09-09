import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();

  const storedProfile = JSON.parse(localStorage.getItem('profile') || '{}');
  const userEmail = storedProfile.email;
  const userId = storedProfile.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { email: userEmail }
        });
        setProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put('/api/profile', { ...formData, email: userEmail }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { email: userEmail },
      });
      setProfile(formData);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDelete = async () => {
    try {
      await axios.delete('/api/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: { email: userEmail, id: userId }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      {editMode ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly
              className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100"
            />
          </div>
          {/* Add more fields as needed */}
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update Profile
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 mb-2"><strong>First Name:</strong> {profile.fname}</p>
          <p className="text-gray-700 mb-2"><strong>Last Name:</strong> {profile.lname}</p>
          <p className="text-gray-700 mb-4"><strong>Email:</strong> {profile.email}</p>
          {/* Add more fields as needed */}
          <div className="flex gap-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
