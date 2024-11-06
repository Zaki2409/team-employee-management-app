// app/dashboard/layout.tsx
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background-color">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-white flex-1 rounded-tl-lg shadow-md">
          {children}
        </main>
      </div>
    </div>
  );
}
