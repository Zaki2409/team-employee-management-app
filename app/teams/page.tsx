// app/teams/create/page.tsx
"use client"; // Marking this file as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession

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
      router.push('/dashboard');
    } else {
      console.error('Failed to create team');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="card w-full max-w-md">
        <h1 className="text-2xl font-bold">Create a New Team</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Team Name"
          required
          className="input mt-4"
        />
        <button type="submit" className="btn mt-4">Create Team</button>
      </form>
    </div>
  );
}
