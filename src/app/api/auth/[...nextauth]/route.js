import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Ej. prueba@gmail.com",
        },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        await connectDB();

        const userLogin = await User.findOne({
          email: credentials?.email,
        }).select("+password"); // .select("+password") esto debido a que en models colocamos en falso la seleccion

        if (!userLogin) {
          throw new Error("Datos incorrecto...");
        }

        const pass = bcrypt.compareSync(
          credentials?.password,
          userLogin.password
        );

        if (!pass) {
          throw new Error("Datos incorrectos...");
        }

        console.log(userLogin);

        return userLogin;
        /*  if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        } */
      },
    }),
  ],

  callbacks: {
    /*  async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },*/
    async session({ session, user, token }) {
      console.log(session, token);
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account, profile, session }) {
      if (user) token.user = user;
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
