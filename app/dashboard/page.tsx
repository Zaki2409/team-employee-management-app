
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'; // Import redirect from next/navigation
import Link from 'next/link'; // Import Link for navigation

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
        <p className="text-lg mt-2 text-gray-900">Hello, {session.user?.name}!</p>
        <p className="mt-4 text-gray-900">Here’s your employee management overview:</p>
        
        {/* Create Team Button */}
        <Link href="/teams">
          <button className="btn mt-4">Create Team</button>
        </Link>
      </div>
    </div>
  );
}
