import { NextApiHandler } from 'next'

import { twitter } from '~/lib/twitter'

const Api: NextApiHandler = async (req, res) => {
  const client = await twitter(req)
  const listList = await client.get('lists/list', {
    reverse: true,
  })

  res.status(200).json(listList)
}

export default Api
