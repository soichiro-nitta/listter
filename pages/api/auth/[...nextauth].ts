import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } from '~/lib/constants'

const options = {
  // callbacks: {
  //   jwt: async (token, user, account, profile, isNewUser) => {
  //     return Promise.resolve(token)
  //   },
  //   redirect: async (url, baseUrl) => {
  //     return Promise.resolve(baseUrl)
  //   },
  //   session: async (session, user) => {
  //     return Promise.resolve(session)
  //   },
  //   signIn: async (user, account, profile) => {
  //     return Promise.resolve(true)
  //   },
  // },
  pages: {
    error: '/auth/error', // Error code passed in query string as ?error=
    newUser: null, // If set, new users will be directed here on first sign in
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    verifyRequest: '/auth/verify-request', // (used for check email message)
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
  // Configure one or more authentication providers
  providers: [
    Providers.Twitter({
      clientId: TWITTER_CONSUMER_KEY,
      clientSecret: TWITTER_CONSUMER_SECRET,
    }),
    // ...add more providers here
  ],
}

export default (req, res) => NextAuth(req, res, options)
