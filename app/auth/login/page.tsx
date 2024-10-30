'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { ...credentials, callbackUrl: '/dashboard' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Log In</h1>
      <input
        type="text"
        placeholder="Username"
        className="p-2 border rounded-md mb-2 w-full"
        onChange={e => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded-md mb-4 w-full"
        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit" className="w-full h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out">
        Log In
      </button>
    </form>
  );
}
