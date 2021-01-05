import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'
import Twitter from 'twitter'

import { TWITTER_API_KEY, TWITTER_API_KEY_SECRET } from '~/lib/constants'

const Api: NextApiHandler = async (req, res) => {
  const { id } = req.query

  const session = await getSession({ req })
  const client = new Twitter({
    access_token_key: session.accessToken,
    access_token_secret: session.refreshToken,
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_KEY_SECRET,
  })

  const timeline = await client.get('lists/statuses', {
    list_id: id,
  })
  res.status(200).json(timeline)

  // const {
  //   query: { id, name },
  //   method,
  // } = req

  // switch (method) {
  //   case 'GET':
  //     // Get data from your database
  //     res.status(200).json({ id, name: `User ${id}` })
  //     break
  //   case 'PUT':
  //     // Update or create data in your database
  //     res.status(200).json({ id, name: name || `User ${id}` })
  //     break
  //   default:
  //     res.setHeader('Allow', ['GET', 'PUT'])
  //     res.status(405).end(`Method ${method} Not Allowed`)
  // }
}

export default Api
