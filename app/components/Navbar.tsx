// app/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-6 h-30"> {/* Increased padding and height */}
     <h1 className="text-3xl font-bold text-center">My Dashboard</h1>
      <div className="flex space-x-4">
        {/* Add navigation links if needed */}
      </div>
    </nav>
  );
}
