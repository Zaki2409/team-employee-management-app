"use client"; // Marking this file as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession
import Link from 'next/link'; // Import Link from next/link

export default function CreateTeam() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { data: session } = useSession(); // Access session data

  console.log(session); // Check the session object for debugging

  // Set creatorId directly from session if available
  const employeeId = session?.user?.employeeId || null; // Safely access employeeId

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId) {
      console.error('Employee ID is not available'); // Log if employee ID is not found
      return; // Prevent submission if employee ID is not available
    }

    const response = await fetch('/api/auth/teams/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, creatorId: employeeId }), // Use employeeId as creatorId
    });

    if (response.ok) {
      router.push('/teams/teamlist'); // Redirect to Team List page after team creation
    } else {
      console.error('Failed to create team');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="card w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Create a New Team</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Team Name"
          required
          className="input mt-4 w-full p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="btn mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Team
        </button>

        {/* Back Button */}
        <Link href="/dashboard">
          <button 
            type="button" 
            className="btn mt-4 w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
        </Link>
      </form>
    </div>
  );
}
