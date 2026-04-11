import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecommendedProducts from '../components/Recomendation';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<any>({
    fname: '',
    lname: '',
    email: '',
    phoneNumber: [],
    address: [{ province: '', state: '', district: '', postal_code: '' }],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const id = JSON.parse(localStorage.getItem('profile') || '')._id;
      try {
        const response = await axios.get(`http://localhost:3001/api/profile/${id}`);
        setUserData(response.data);
        console.log(response.data);

        // If address is not an array, ensure it becomes one
        const address = Array.isArray(response.data.address) ? response.data.address : [{ province: '', state: '', district: '', postal_code: '' }];
        
        setFormValues({ ...response.data, address });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddressChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedAddress = formValues.address.map((addr: any, i: number) =>
      i === index ? { ...addr, [name]: value } : addr
    );
    setFormValues({ ...formValues, address: updatedAddress });
  };

  const handleUpdateProfile = async () => {
    const id = JSON.parse(localStorage.getItem('profile') || '')._id;
    try {
      await axios.put(`http://localhost:3001/api/profile`, { id, ...formValues });
      alert('Profile updated successfully!');
      setUserData(formValues);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
    }
  };

  const handleDeleteAccount = async () => {
    const id = JSON.parse(localStorage.getItem('profile') || '')._id;
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`http://localhost:3001/api/profile`, { data: { id } });
        alert('Account deleted successfully.');
        // Optionally redirect to login page or clear user data
      } catch (err) {
        console.error('Error deleting account:', err);
        setError('Failed to delete account.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="fname"
          value={formValues.fname}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lname"
          value={formValues.lname}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
        <textarea
          name="phoneNumber"
          value={formValues.phoneNumber.join(', ')}
          onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value.split(', ') })}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          rows={3}
        />
      </div>

      {/* Display address fields */}
      {formValues.address.map((addr: any, index: number) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address {index + 1}</label>
          <input
            type="text"
            name="province"
            value={addr.province}
            onChange={(e) => handleAddressChange(index, e)}
            placeholder="Province"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-2"
          />
          <input
            type="text"
            name="state"
            value={addr.state}
            onChange={(e) => handleAddressChange(index, e)}
            placeholder="State"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-2"
          />
          <input
            type="text"
            name="district"
            value={addr.district}
            onChange={(e) => handleAddressChange(index, e)}
            placeholder="District"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-2"
          />
          <input
            type="text"
            name="postal_code"
            value={addr.postal_code}
            onChange={(e) => handleAddressChange(index, e)}
            placeholder="Postal Code"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      ))}

      <div className="flex space-x-4">
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Update Profile
        </button>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          Delete Account
        </button>
      </div>
      
    </div>
    <RecommendedProducts />
    </div>

  );
};

export default Profile;
