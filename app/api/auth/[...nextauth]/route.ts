import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/mongodb';
import Employee from '@/models/Employee';
import { compare } from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        
        // Fetch the employee from the database
        const user = await Employee.findOne({ username: credentials?.username });
        
        // Check if user exists and verify password
        if (user && await compare(credentials!.password, user.password)) {
          // Return user object with employeeId
          return { id: user._id.toString(), employeeId: user.employeeId, name: user.name, email: user.username  };
        }
        

        // Return null if user not found or password incorrect
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for sessions
    maxAge: 2 * 60, // 2 minutes
  },
  pages: {
    signIn: '/auth/login', // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Ensure user is defined
      if (user) {
        token.employeeId = user.employeeId as string; // Type assertion
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure token is defined
      if (token) {
        session.user.employeeId = token.employeeId as string; // Type assertion
      }
      return session;
    },
  },
};

// Create the handler for NextAuth
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
