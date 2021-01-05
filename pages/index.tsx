import { signIn, signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'

import { useRequest } from '~/lib/hooks/useRequest'
import { ListList, Timeline } from '~/lib/types'

const Page: React.FC = () => {
  const [session, loading] = useSession()
  const [currentId, setCurrentId] = useState('')

  const listList: ListList = useRequest('/api/list')
  const timeline: Timeline = useRequest(`/api/list/${currentId}`)

  const clickList = ({ target }) => {
    const id = target.getAttribute('data-id')
    setCurrentId(id)
  }

  useEffect(() => {
    console.log({ timeline })
  }, [timeline])

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
            {listList?.map((list) => (
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
              <li key={tweet.id_str} className="flex justify-between mt-8">
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
