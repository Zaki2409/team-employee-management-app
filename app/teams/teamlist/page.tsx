// app/teams/page.tsx
"use client"; // Add this line
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Team {
  _id: string; // Adjust according to your Team model
  name: string; // Adjust according to your Team model
  description: string; // Adjust according to your Team model
}

const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/auth/teams');
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
  <h1 className="text-4xl font-bold mb-6 text-gray-800">Teams</h1>
  <div className="flex flex-col space-y-6 w-full max-w-md mx-auto">
    {teams.map((team) => (
      <div key={team._id} className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-900">{team.name}</h2>
        <p className="mt-2 text-gray-600">{team.description}</p>
        <Link href={`/teams/${team._id}`} className="inline-block text-blue-600 hover:underline mt-4 font-medium">
          View Details
        </Link>
      </div>
    ))}
  </div>
</div>

  );
};

export default TeamList;
