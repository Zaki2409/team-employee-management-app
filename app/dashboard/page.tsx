// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-color">
      <div className="card w-full max-w-md p-6 shadow-lg bg-white rounded-lg text-center">
        <h1 className="text-3xl font-bold text-primary-color mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-700 mb-2">Hello, {session.user?.name}!</p>
        <p className="mb-4 text-gray-600">Here’s your employee management overview:</p>
        <Link href="/teams">
          <button className="btn mt-4 bg-secondary-color text-text-color hover:bg-hover-bg-color px-4 py-2 rounded-md">
            Create Team
          </button>
        </Link>
      </div>
    </div>
  );
}
