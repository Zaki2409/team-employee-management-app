// app/dashboard/layout.tsx
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import React from 'react';



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
