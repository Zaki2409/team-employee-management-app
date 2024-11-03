"use client"; // This makes the component a Client Component

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Team {
  _id: string;
  teamId: string; // Added to match your API structure
  name: string;
  description: string;
  members: string[]; // Represents user IDs
}

const TeamDetail: React.FC = () => {
  const { teamId } = useParams(); // useParams to access route parameters
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]); // State for team members

  useEffect(() => {
    if (!teamId) return;

    const fetchTeam = async () => {
      try {
        const response = await fetch(`/api/auth/teams/${teamId}`);
        if (!response.ok) throw new Error('Failed to fetch team details');
        const data = await response.json();
        setTeam(data);
        setUsers(data.members || []); // Initialize users from fetched team data
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  const handleAddUser = async () => {
    const newUserId = prompt('Enter the user ID to add:');
    if (newUserId) {
      const response = await fetch(`/api/auth/teams/${teamId}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: newUserId }),
      });
  
      if (response.ok) {
        setUsers((prev) => [...prev, newUserId]); // Update the users state
      } else {
        console.error('Failed to add user');
      }
    }
  };
  
  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = confirm(`Are you sure you want to delete user ${userId}?`);
    if (confirmDelete) {
      console.log(userId);
      const response = await fetch(`/api/auth/teams/${teamId}/removeUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Send the userId to be removed
      });
  
      if (response.ok) {
        setUsers((prev) => prev.filter((id) => id !== userId)); // Update the users state
      } else {
        console.error('Failed to delete user');
      }
    }
  };
  
  if (loading) return <p>Loading team details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!team) return <p>No team details available.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-16 shadow-lg rounded-lg w-full h-screen max-w-full mx-auto"> {/* Full width and height */}
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{team.name}</h1>
        <p className="text-gray-700 mb-4">{team.description}</p>

        <div className="mt-6">
          <button onClick={handleAddUser} className="mr-4 bg-blue-500 text-white px-4 py-2 rounded">
            Add User
          </button>
        </div>

        <h2 className="text-2xl font-semibold mt-6 text-gray-900">Members:</h2>
        <ul className="list-disc list-inside mt-2">
          {users.map((userId) => (
            <li key={userId} className="flex items-center justify-between">
              <span className=' text-gray-900'>{userId}</span>
              <button onClick={() => handleDeleteUser(userId)} className="text-red-500 hover:underline">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamDetail;
