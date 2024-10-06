import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaChartBar } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2'; // For graph charts
import 'chart.js/auto';
import SidebarComp from '../dashboard/SidebarComp';

interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string[];
  address: {
    province: string;
    state: string;
    district: string;
    postal_code: string;
  }[];
  profile_image_path?: string;
  dob?: string;
  createdAt?: string;
}

const UserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const userByProvince = users.reduce((acc: Record<string, number>, user) => {
    const province = user.address?.[0]?.province || 'Unknown';
    acc[province] = (acc[province] || 0) + 1;
    return acc;
  }, {});

  const userAgeDistribution = users.reduce((acc: Record<string, number>, user) => {
    if (user.dob) {
      const age = Math.floor((new Date().getTime() - new Date(user.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
      const ageGroup = age < 20 ? '0-20' : age < 40 ? '21-40' : age < 60 ? '41-60' : '61+';
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div>
      <SidebarComp />
      <div className='main-content'>
    <div className="container mx-auto p-4">
      {/* User Data Table */}
      <h2 className="text-3xl font-bold mb-4 text-gray-800">User Dashboard</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">Last Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Province</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100 cursor-pointer">
              <td className="py-2 px-4 border">{user.fname}</td>
              <td className="py-2 px-4 border">{user.lname}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.phoneNumber[0]}</td>
              <td className="py-2 px-4 border">{user.address?.[0]?.province || 'Unknown'}</td>
              <td className="py-2 px-4 border flex space-x-2">
                
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Users by Province</h3>
          <Bar
            data={{
              labels: Object.keys(userByProvince),
              datasets: [
                {
                  label: 'Number of Users',
                  data: Object.values(userByProvince),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
              ],
            }}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">User Age Distribution</h3>
          <Bar
            data={{
              labels: Object.keys(userAgeDistribution),
              datasets: [
                {
                  label: 'Number of Users',
                  data: Object.values(userAgeDistribution),
                  backgroundColor: 'rgba(153, 102, 255, 0.6)',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserDashboard;
