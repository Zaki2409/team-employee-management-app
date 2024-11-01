import NextAuth from 'next-auth';

// Extend the NextAuth session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Assuming user ID is a string
      employeeId?: string; // Add employeeId here
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    employeeId?: string; // Add employeeId to the User type as well
  }
}
