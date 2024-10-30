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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={e => setCredentials({ ...credentials, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
      <button type="submit">Log In</button>
    </form>
  );
}
