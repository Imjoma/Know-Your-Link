import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createConnection } from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          throw new Error("Username and password are required.");
        }
        try {
          const db = await createConnection();
          const sql = "SELECT * FROM users WHERE username = ?";
          const [rows] = await db.query(sql, [credentials.username]);
          if (rows.length === 0) {
            throw new Error("User not found!");
          }
          const user = rows[0];

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return {
                id: user.id,
                username: user.username,
                email: user.email,
              };
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/profile/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url;
    },
    async jwt({ token, user }) {
      // Add user info to the token
      if (user) {
        token.id = user.id;
        token.username = user.username; // Add username to token
        token.email = user.email; // Add any other fields you want
      }
      return token;
    },
    async session({ session, token }) {
      // Add token fields to the session
      session.user.id = token.id;
      session.user.username = token.username; // Add username to session
      session.user.email = token.email; // Add any custom fields here
      return session;
    },
  },
};
