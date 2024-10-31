// app/dashboard/layout.tsx
import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path as necessary
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
