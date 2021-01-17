// got, created, updated, deleted

import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

import { twitter } from '~/lib/twitter'

const Api: NextApiHandler = async (req, res) => {
  const client = await twitter(req)
  const session = await getSession({ req })

  switch (req.method) {
    case 'GET': {
      console.log('get')
      const got = await client.get('collections/list', {
        user_id: session.id,
      })
      res.status(200).json(Object.values(got.objects.timelines || {}))
      break
    }
    case 'POST': {
      const created = await client.post('collections/create', {
        name: req.body.name,
      })
      res.status(200).json(created)
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
