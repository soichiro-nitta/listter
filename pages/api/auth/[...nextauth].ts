import { NextApiHandler } from 'next'
import NextAuth, { User } from 'next-auth'
import Providers from 'next-auth/providers'

import { TWITTER_API_KEY, TWITTER_API_KEY_SECRET } from '~/lib/constants'

const Api: NextApiHandler = async (req, res) =>
  NextAuth(req, res, {
    callbacks: {
      jwt: async (token, user, account, profile, isNewUser) => {
        // console.log('jwt')
        // console.log({ account, isNewUser, profile, token, user })
        const isSignIn = user ? true : false
        if (isSignIn) {
          const { accessToken, id, refreshToken } = account
          const { screen_name } = profile
          Object.assign(token, { accessToken, id, refreshToken, screen_name })
        }
        return Promise.resolve(token)
      },
      redirect: async (url, baseUrl) => {
        // console.log('redirect')
        // console.log({ baseUrl, url })
        return Promise.resolve(baseUrl)
      },
      session: async (
        session,
        user: User & {
          accessToken: string
          id: string
          refreshToken: string
          screen_name: string
        }
      ) => {
        // console.log('session')
        // console.log({ session, user })
        const { accessToken, id, refreshToken, screen_name } = user
        Object.assign(session, { accessToken, id, refreshToken, screen_name })
        return Promise.resolve(session)
      },
      signIn: async (user, account, profile) => {
        // console.log('signIn')
        // console.log({ account, profile, user })
        return Promise.resolve(true)
      },
    },
    // events: {
    //   createUser: async (message) => {
    //     /* user created */
    //   },
    //   error: async (message) => {
    //     /* error in authentication flow */
    //   },
    //   linkAccount: async (message) => {
    //     /* account linked to a user */
    //   },
    //   session: async (message) => {
    //     /* session is active */
    //   },
    //   signIn: async (message) => {
    //     /* on successful sign in */
    //   },
    //   signOut: async (message) => {
    //     /* on signout */
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
        clientId: TWITTER_API_KEY,
        clientSecret: TWITTER_API_KEY_SECRET,
      }),
      // ...add more providers here
    ],
  })

export default Api
