import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      matra?: string | null
      loginAt?: number
    } & DefaultSession["user"]
  }
  interface User {
    id: string
    role: string
    matra?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: string
    matra?: string | null
    loginAt?: number
  }
}

