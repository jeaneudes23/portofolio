import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const {
  handlers,
  auth,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      return user.email === process.env.ADMIN_EMAIL
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
})
