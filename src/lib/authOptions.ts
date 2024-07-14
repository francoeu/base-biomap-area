import { signJwtAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt'
    },
    // jwt: {},
    pages:{
      signIn: '/login',
      signOut: '/login',
    },
    providers: [
      CredentialsProvider({
        name: 'Fazer Login',
        credentials: {
          email: {
            label: 'E-mail',
            type: 'email',
            placeholder: 'hello@example.com'
          },
          password: { label: 'Senha', type: 'password' }
        },
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials.password) {
            return null
          }
  
                 // Add logic here to look up the user from the credentials supplied
                 const res = await fetch(`${BASE_URL}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: credentials?.email,
                    password: credentials?.password,
                  }),
                });
  
        //  console.log('API/AUTH - FETCH RESPONSE:',res)
  
          // const user = await res.json();
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })
  
          if (!user) {
            return null
          }
  
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          )
  
          if (!isPasswordValid) {
            return null
          }
  
            const { password, ...userWithoutPass } = user;
            const accessToken = signJwtAccessToken(userWithoutPass);
  
          return {
            id: user.id + '',
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            accessToken: accessToken
          }
        }
      })
    ],
    callbacks: {
      async jwt({ token, user }) {
        console.log('------------')
        console.log('JWT Callback', { token, user })
        return { ...token, ...user };
      },
      async session({ session, token }) {
        session.user = token as any;
        console.log('------------')
        console.log('Session Callback', { session, token })
        return session;
      },
    },
  }