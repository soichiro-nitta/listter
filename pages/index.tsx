import { GetServerSideProps } from 'next'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { listenerCount } from 'process'
import useSWR, { mutate } from 'swr'
import Twitter from 'twitter'

import {
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_KEY_SECRET,
} from '~/lib/constants'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  let lists = {}
  if (session) {
    const client = new Twitter({
      access_token_key: session.accessToken,
      access_token_secret: session.refreshToken,
      consumer_key: TWITTER_API_KEY,
      consumer_secret: TWITTER_API_KEY_SECRET,
    })
    lists = await client.get('lists/list', {
      reverse: true,
    })
    // res = await client.post('lists/create', {
    //   description: 'unko2021',
    //   mode: 'private',
    //   name: 'unko list',
    // })
  }

  return {
    props: { lists },
  }
}

const Page: React.FC<{
  lists: {
    created_at: string
    description: string
    following: boolean
    full_name: string
    id: number
    id_str: string
    member_count: number
    mode: string
    name: string
    slug: string
    subscriber_count: number
    uri: string
    user: {}
  }[]
}> = (props) => {
  const [session, loading] = useSession()
  console.log(props.lists)

  // mutate('session', session)
  // const { data } = useSWR('session')

  return (
    <div className="px-8">
      {session ? (
        <>
          <div className="underline">Signed in as {session.user.email}</div>
          <button onClick={() => signOut()} className="p-3 mt-8 border">
            Sign out
          </button>
          <ul className="mt-8">
            {props.lists.map((list) => (
              <li key={list.id} className="mt-4">
                {list.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="underline">Not signed in</div>
          <button onClick={() => signIn('twitter')} className="p-3 mt-8 border">
            Sign in
          </button>
        </>
      )}
    </div>
  )
}

export default Page
