"use client"; // This makes the component a Client Component

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter from next/navigation

interface Team {
  _id: string;
  teamId: string; // Added to match your API structure
  name: string;
  description: string;
  members: string[]; // Represents user IDs
}

interface Employee {
  uid: string; // Adjust this interface to match the employee data structure
}

const TeamDetail: React.FC = () => {
  const { teamId } = useParams(); // useParams to access route parameters
  const router = useRouter(); // Use the useRouter hook
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]); // State for team members
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');


  useEffect(() => {
    const fetchEmployees = async () => {
      console.log("fetch emplouyee ");
      try {
        const response = await fetch('/api/auth/employees');
        if (!response.ok) throw new Error('Failed to fetch employees');
        
        const data = await response.json();
        console.log("fetch emplouyee ",data);
        setEmployees(data.employees); // Set the fetched employees
      } catch (err) {
        console.error(err);
        setError('Failed to fetch zaki');
      }
    };

    fetchEmployees();
  }, []);

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

    if (response.ok) {
      setUsers((prev) => [...prev, selectedUserId]); // Update the users state
      alert('User added successfully.');
    } else if (response.status === 403) {
      alert('You are not authorized to add users as you are not a team member.');
      router.push('/teams/teamlist'); // Use router to redirect to the team list page
    } else {
      const errorData = await response.json();
      console.error('Failed to add user:', errorData.message);
    }
  };

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
        setUsers((prev) => prev.filter((id) => id !== userId)); // Update the users state
        alert('User removed successfully.');
      } else if (response.status === 403) {
        alert('You are not authorized to remove users as you are not a team member.');
        router.push('/teams/teamlist'); // Use router to redirect to the team list page
      } else {
        const errorData = await response.json();
        console.error('Failed to delete user:', errorData.message);
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
          <select 
            value={selectedUserId} 
            onChange={(e) => setSelectedUserId(e.target.value)} 
            className="mr-4 border text-gray-900 p-2 rounded"
          >  
            <option value="" >Select a user to add</option>
            {employees.map((employee) => (
             
              <option key={employee.uid} value={employee.uid}>
                {employee.uid} {/* Display employee UID */}
                
              </option >
            ))}
            
          </select>
          
          <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add User
          </button>
        </div>

        <h2 className="text-2xl font-semibold mt-6 text-gray-900">Members:</h2>
        <ul className="list-disc list-inside mt-2">
          {users.map((userId) => (
            <li key={userId} className="flex items-center justify-between">
              <span className='text-gray-900'>{userId}</span>
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
