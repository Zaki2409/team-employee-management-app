"use client"; // This makes the component a Client Component

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter from next/navigation

interface Team {
  _id: string;
  teamId: string;
  name: string;
  description: string;
  members: string[]; // Represents user IDs
}

interface Employee {
  uid: string; // Employee unique identifier
  name: string; // Employee name
}

const TeamDetail: React.FC = () => {
  const { teamId } = useParams(); // useParams to access route parameters
  const router = useRouter(); // Use the useRouter hook
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]); // State for team members
  const [employees, setEmployees] = useState<Employee[]>([]); // List of all employees
  const [selectedUserId, setSelectedUserId] = useState('');

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/auth/employees');
        if (!response.ok) throw new Error('Failed to fetch employees');
        
        const data = await response.json();
        setEmployees(data.employees); // Store fetched employees data
      } catch (err) {
        console.error(err);
        setError('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  // Fetch team details
  useEffect(() => {
    if (!teamId) return;

    const fetchTeam = async () => {
      try {
        const response = await fetch(`/api/auth/teams/${teamId}`);

        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData); // Log the error for debugging

          // Redirect and show a notification
          if (errorData.error) {
            alert(errorData.error.message); // Show the error message as a popup
            router.push('/teams/teamlist'); // Redirect to the team list
          }
          return; // Exit the function early if there's an error
        }

        const data = await response.json();
        setTeam(data);
        setUsers(data.members || []); // Initialize users from fetched team data
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Set error message from the Error object
        } else {
          setError('An unknown error occurred.'); // Fallback for non-Error instances
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId, router]);

  // Add user to team
  const handleAddUser = async () => {
    if (!selectedUserId) {
      alert('Please select a user to add.');
      return;
    }
     // Check if the user is already in the team
     if (users.includes(selectedUserId)) {
      alert('User is already added to the team.');
      return;
    }

    const response = await fetch(`/api/auth/teams/${teamId}/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: selectedUserId }),
    });
    const data = await response.json();
    if (response.ok) {
      setUsers((prev) => [...prev, selectedUserId]); // Update the users state
      alert('User added successfully.');
    // } else {
    //   const errorData = await response.json();
    //   console.error('Failed to add user:', errorData.message);
    // }
    }else {
      // Error case, handle the message returned from the server
      alert(data.message); // This will show 'User is already a member of this team.'
    }
  };

  // Delete user from team
  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = confirm(`Are you sure you want to delete user ${userId}?`);
    if (confirmDelete) {
      const response = await fetch(`/api/auth/teams/${teamId}/removeUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Remove the user from the team in the state
        setUsers((prev) => prev.filter((id) => id !== userId)); // Update the users state
        setTeam((prev) => ({
          ...prev!,
          members: prev!.members.filter((id) => id !== userId), // Remove user from team members
        })); // Update the team state to reflect the changes
        alert('User removed successfully.');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete user:', errorData.message);
        alert('Failed to remove user.');
      }
    }
  };
  

  // Find user name by userId
  const getUserName = (userId: string) => {
    const user = employees.find((emp) => emp.uid === userId);
    return user ? user.name : userId; // Return user name or fallback to userId if not found
  };

  if (loading) return <p className="text-center text-xl text-white">Loading team details...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error: {error}</p>;
  if (!team) return <p className="text-center text-xl text-white">No team details available.</p>;

  return (
    <div className="min-h-screen bg-blue-500 text-white flex   justify-center p-8">
  <div className="bg-white p-16 shadow-lg rounded-lg w-full max-w-8xl mx-auto space-y-8">
    {/* Back Button */}
    <button
      onClick={() => router.push('/teams/teamlist')}
      className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 w-full sm:w-auto"
    >
      &larr; Back to Team List
    </button>

    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">{team.name}</h1>
      <p className="text-lg text-gray-700 mt-2">{team.description}</p>
    </div>

    {/* Add User Section */}
    <div className="mb-6 flex flex-col sm:flex-row items-center justify-center sm:space-x-4">
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="border text-gray-900 p-3 rounded-md mb-4 sm:mb-0 w-full sm:w-auto"
      >
        <option value="">Select a user to add</option>
        {employees.map((employee) => (
          <option key={employee.uid} value={employee.uid}>
            {employee.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddUser}
        className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 w-full sm:w-auto"
      >
        Add User
      </button>
    </div>

    {/* Team Members Section */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">Team Members:</h2>
      <ul className="list-disc list-inside mt-4 space-y-4">
        {team.members.map((userId) => (
          <li key={userId} className="flex items-center justify-between">
            <span className="text-gray-900">{getUserName(userId)}</span>
            <button
              onClick={() => handleDeleteUser(userId)}
              className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 w-full sm:w-auto"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );  
};

export default TeamDetail;
