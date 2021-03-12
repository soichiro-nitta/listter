import { NextApiHandler } from 'next'

import { twitter } from '~/lib/twitter'

const Api: NextApiHandler = async (req, res) => {
  const client = await twitter(req)

  switch (req.method) {
    case 'GET': {
      const got = await client.get('lists/list', {
        reverse: true,
      })
      res.status(200).json(got)
      break
    }
    case 'POST': {
      res.status(200).json({})
      break
    }
    case 'PUT': {
      res.status(200).json({})
      break
    }
    case 'DELETE': {
      res.status(200).json({})
      break
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}

export default Api
