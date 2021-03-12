import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'

import { Anchor } from '~/components/Anchor'
import { Header } from '~/components/Header'
import { Twemoji } from '~/components/Twemoji'
import { pagesPath } from '~/lib/$path'
import { LISTS } from '~/lib/constants'
import { useCollection, useLists, useTimeline } from '~/lib/hooks/swr'
import { createCollection } from '~/lib/requests'
import { List } from '~/lib/types'

const Page = () => {
  const [session, loading] = useSession()

  const lists: List[] = LISTS
  // const { data: lists } = useLists()
  const { data: collection } = useCollection()

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
    <div className="">
      {session ? (
        <>
          <Header>
            <div className="font-bold">All Lists</div>
          </Header>

          <div className="w-full px-8 py-6 bg-secondary">
            {lists?.length} lists.
          </div>

          {/* lists list */}
          <ul className="border-t border-white border-opacity-25">
            {lists?.map((list) => (
              <li key={list.id_str} data-id={list.id_str}>
                <Anchor
                  {...{
                    href: pagesPath.lists._id(list.id_str).$url(),
                  }}
                  className="flex items-center justify-between px-8 py-4 border-b border-white border-opacity-25"
                >
                  <div className="">{list.name}</div>
                  <div className="flex">
                    <button className="flex items-center justify-center border border-white rounded-full border-opacity-25 w-9 h-9">
                      <Twemoji className="w-auto h-4" emoji="👀" />
                    </button>
                    <button className="flex items-center justify-center ml-4 border border-white rounded-full border-opacity-25 w-9 h-9">
                      <Twemoji className="w-auto h-4" emoji="✍️" />
                    </button>
                    <button className="flex items-center justify-center ml-4 border border-white rounded-full border-opacity-25 w-9 h-9">
                      <Twemoji className="w-auto h-4" emoji="🔥" />
                    </button>
                  </div>
                </Anchor>
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
