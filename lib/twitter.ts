import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/client'
import Twitter from 'twitter'

import { TWITTER_API_KEY, TWITTER_API_KEY_SECRET } from '~/lib/constants'

export const twitter = async (req: NextApiRequest): Promise<Twitter> => {
  const session = await getSession({ req })

  return new Twitter({
    access_token_key: session.accessToken,
    access_token_secret: session.refreshToken,
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_KEY_SECRET,
  })
}
