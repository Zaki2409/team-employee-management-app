// import { handlers } from "@/auth" // Referring to the auth.ts we just created
// export const { GET, POST } = handlers
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
        const user = await Employee.findOne({ username: credentials?.username });
        if (user && await compare(credentials!.password, user.password)) {
          return { id: user._id, name: user.name, email: user.username };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Ensures the type is SessionStrategy instead of generic string
    maxAge: 2 * 60, // 2 minutes
  },
  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
