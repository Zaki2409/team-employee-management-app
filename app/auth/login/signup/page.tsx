'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [form, setForm] = useState({ username: '', password: '', name: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/auth/login');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <input
        type="text"
        placeholder="Name"
        className="p-2 border rounded-md mb-2 w-full  bg-gray-800"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        className="p-2 border rounded-md mb-2 w-full  bg-gray-800"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded-md mb-4 w-full  bg-gray-800"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" className="w-full h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out">
        Sign Up
      </button>
    </form>
  );
}
