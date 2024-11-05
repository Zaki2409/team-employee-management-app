"use client"; // Add this directive to make the component a Client Component

import Link from 'next/link';
import { signOut } from 'next-auth/react'; // Import signOut function

export default function Sidebar() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: 'http://localhost:3000' }); // Sign out and redirect
  };

  return (
    <aside className="bg-blue-600 w-64 p-4">
      <h1 className="font-bold mb-4">WeCommmit</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="text-white hover:underline">DashBoard</Link>
        </li>
        <li>
          <Link href="/teams/teamlist" className="text-white hover:underline">Team List</Link>
        </li>
        <li>
          <button 
            onClick={handleLogout} 
            className="text-white hover:underline"
          >
            Log Out
          </button>
        </li>
      </ul>
    </aside>
  );
}
