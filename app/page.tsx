import Link from "next/link"; // Import Link from Next.js
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
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
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 h-10 sm:h-12 px-4 sm:px-5">
              Sign Up
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 h-10 sm:h-12 px-4 sm:px-5">
              Log In
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 h-10 sm:h-12 px-4 sm:px-5">
              Dashboard
            </button>
          </Link>
        </div>
      </main>
      {/* Footer section remains unchanged */}
    </div>
  );
}
