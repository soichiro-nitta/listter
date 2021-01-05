import { GetServerSideProps } from 'next'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
// import useSwr, { mutate } from 'swr'
import Twitter from 'twitter'

import {
  LIST_LIST,
  TWITTER_API_KEY,
  TWITTER_API_KEY_SECRET,
} from '~/lib/constants'
import { useGetTimeline } from '~/lib/hooks/useRequest'
import { List, Timeline } from '~/lib/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  let listList = [{}] as List[]
  const timelineList = [[]] as Timeline[]

  if (session) {
    const client = new Twitter({
      access_token_key: session.accessToken,
      access_token_secret: session.refreshToken,
      consumer_key: TWITTER_API_KEY,
      consumer_secret: TWITTER_API_KEY_SECRET,
    })

    listList = LIST_LIST
    // listList = (await client.get('lists/list', {
    //   reverse: true,
    // })) as List[]

    // for (const list of listList) {
    //   const _timeline = (await client.get('lists/statuses', {
    //     list_id: list.id_str,
    //   })) as Timeline
    //   timelineList.push(_timeline)
    // }
  }

  return {
    props: { listList, timelineList },
  }
}

const Page: React.FC<{
  listList: List[]
  // timelineList: Timeline[]
}> = (props) => {
  const [currentId, setCurrentId] = useState(props.listList[0].id_str)
  const [session, loading] = useSession()
  const { timeline } = useGetTimeline(`/api/timeline/${currentId}`)

  // mutate('session', session)
  // const { data } = useSwr('session')

  const clickList = ({ target }) => {
    const id = target.getAttribute('data-id')
    setCurrentId(id)
  }

  useEffect(() => {
    console.log({ timeline })
  }, [timeline])

  return (
    <div className="px-8">
      {session ? (
        <>
          <div className="underline">Signed in as {session.user.email}</div>
          <button onClick={() => signOut()} className="p-3 mt-8 border">
            Sign out
          </button>
          <ul className="mt-8">
            {props.listList.map((list) => (
              <li
                key={list.id_str}
                className="mt-4"
                data-id={list.id_str}
                onClick={clickList}
              >
                {list.name}
              </li>
            ))}
          </ul>
          <ul className="mt-8">
            {timeline?.map((tweet) => (
              <li key={tweet.id_str} className="flex justify-between">
                <div className="w-16 h-16">
                  <img
                    src={tweet.user.profile_image_url}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>

                <div className="w-92 font-inter">
                  <div className="font-bold">{tweet.user.name}</div>
                  <div className="">{tweet.user.screen_name}</div>
                  <div className="">{tweet.created_at}</div>
                  <div className="">{tweet.text}</div>
                </div>
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
