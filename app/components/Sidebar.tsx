// app/components/Sidebar.tsx
"use client"; // Add this directive to make the component a Client Component

import Link from 'next/link';
import { signOut } from 'next-auth/react'; // Import signOut function

export default function Sidebar() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: 'http://localhost:3000' }); // Sign out and redirect
  };

  return (
    <aside className="bg-blue-500 w-64 p-4 pt-10"> {/* Light blue background */}
     <h1 className="font-extrabold text-2xl mb-6 pb-5 text-blue-900 tracking-wider">
  WeCommmit
</h1>
      <ul className="space-y-6">
        <li>
          <Link href="/dashboard" className="text-white hover:underline pb-16">DashBoard</Link>
        </li>
        <li>
          <Link href="/teams/teamlist" className="text-white hover:underline pt-1">Team List</Link>
        </li>
        <li>
          <Link href="/teams/employeelist" className="text-white hover:underline pt-1">Employee List</Link>
        </li>
        <li>
          <button 
            onClick={handleLogout} 
            className="text-white hover:underline pb"
          >
            Log Out
          </button>
        </li>
      </ul>
    </aside>
  );
}
