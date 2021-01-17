import { signIn, signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'

import { LIST } from '~/lib/constants'
import { useCollection, useList, useTimeline } from '~/lib/hooks/swr'
import { createCollection } from '~/lib/requests'
import { List } from '~/lib/types'

const Page: React.FC<{}> = () => {
  const [session, loading] = useSession()
  const [listId, setListId] = useState('')

  const list: List = LIST
  // const { data: list } = useList()
  // const { data: timeline } = useTimeline({ id: listId })
  const timeline = []
  const { data: collection } = useCollection()

  const clickList = ({ currentTarget }) => {
    const id = currentTarget.getAttribute('data-id')
    setListId(id)
  }

  const clickTweet = ({ currentTarget }) => {
    const id = currentTarget.getAttribute('data-id')
    console.log({ id })
    fetch('/api/collection', {
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'POST',
    })
  }

  useEffect(() => {
    console.log({ timeline })
  }, [timeline])

  useEffect(() => {
    if (collection) {
      const exist = collection.some((c) => c.name === 'listter.app')
      if (!exist) {
        const created = createCollection({ name: 'listter.app' })
        console.log({ created })
      }
    }
  }, [collection])

  // import useSwr, { mutate } from 'swr'
  // mutate('session', session)
  // const { data } = useSwr('session')

  return (
    <div className="px-8">
      {session ? (
        <>
          <div className="underline">Signed in as {session.user.email}</div>
          <button onClick={() => signOut()} className="p-3 mt-8 border">
            Sign out
          </button>
          <ul className="mt-8">
            {list?.map((list) => (
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
          <ul className="">
            {timeline?.map((tweet) => (
              <li
                key={tweet.id_str}
                className="flex justify-between mt-8"
                data-id={tweet.id_str}
                onClick={clickTweet}
              >
                <div className="w-16 h-16">
                  <img
                    src={tweet.user.profile_image_url}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>

                <div className="w-92 font-inter">
                  <div className="flex">
                    <div className="font-bold">{tweet.user.name}</div>
                    <div className="ml-2">@{tweet.user.screen_name}</div>
                  </div>
                  <div className="mt-2">{tweet.created_at}</div>
                  <div className="mt-2 leading-snug">{tweet.text}</div>
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
