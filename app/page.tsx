import Link from "next/link"; // Import Link from Next.js
import Image from "next/image";
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'; // Import redirect
export default async function Home() {

  const session = await getServerSession(authOptions);

  // Redirect to dashboard if user is already logged in
  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start pb-16">
        <Image
          className="dark:invert"
          src="/WECOMMIT.svg"
          alt="Next.js logo"
          width={280}
          height={68}
          priority
        />
        <h1 className="text-3xl font-bold">Welcome to Your Employee Management App!</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Start by creating an employee record in the{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/api/auth/signup
            </code>
            .
          </li>
          <li>View and manage employee records from the dashboard.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/auth/login/signup">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 h-10 sm:h-12 px-4 sm:px-5">
              Sign Up
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 h-10 sm:h-12 px-4 sm:px-5">
              Log In
            </button>
          </Link>
          {/* <Link href="/dashboard">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 h-10 sm:h-12 px-4 sm:px-5">
              Dashboard
            </button>
          </Link> */}
        </div>
      </main>
      {/* <footer className="mt-8 p-4 bg-gray-800 text-white">
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
