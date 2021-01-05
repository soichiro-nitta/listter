import { NextApiHandler } from 'next'

import { twitter } from '~/lib/twitter'

const Api: NextApiHandler = async (req, res) => {
  const { id } = req.query
  const client = await twitter(req)
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
