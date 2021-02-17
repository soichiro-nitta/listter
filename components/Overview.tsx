import { motion } from '@soichiro_nitta/motion'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Anchor } from '~/components/Anchor'
import { Twemoji } from '~/components/Twemoji'
import { pagesPath } from '~/lib/$path'

// TODO: 右方向スワイプでナビゲーションを開く
export const Overview: React.FC<{}> = () => {
  const [session, loading] = useSession()
  const [menu, setMenu] = useState<boolean>(false)
  const refs = {
    menu: useRef<HTMLDivElement>(null),
  }

  const closeMenu = () => setMenu(false)
  const toggleMenu = useCallback(() => setMenu(!menu), [menu])

  // menu
  useEffect(() => {
    ;(async () => {
      const m = refs.menu.current
      if (menu) {
        //open
        motion.addWillChange(m, 'transform, opacity')
        motion.set(m, { display: 'block', opacity: 0, translateX: '-10%' })
        motion.to(m, 0.5, 'out', {
          opacity: '1',
          translateX: '0%',
        })
      } else {
        // close
        motion.addWillChange(m, 'transform, opacity')
        motion.to(m, 0.5, 'out', {
          opacity: '0',
          translateX: '-10%',
        })
      }
      await motion.delay(0.5)
      if (!menu) motion.set(m, { display: 'none' })
      motion.removeWillChange(m)
    })()
  }, [menu, refs.menu])

  return (
    <>
      {/* header's border */}
      <div className="fixed w-full h-px bg-white opacity-25 top-18" />

      {/* round type 1 */}
      {/* <div className="fixed w-8 h-8 border rounded-full top-4 left-8">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col justify-between w-4 h-3">
            <div className="w-full h-px bg-white" />
            <div className="w-full h-px bg-white" />
            <div className="w-full h-px bg-white" />
          </div>
        </div>
      </div> */}

      {/* menu */}
      <div ref={refs.menu} className="fixed left-0 hidden w-full h-full">
        <div className="absolute top-0 left-0 w-1/2 h-full border-r border-white bg-primary border-opacity-25">
          <ul className="w-full h-full px-8 py-18">
            <li>
              <Anchor
                to={pagesPath.$url().pathname}
                onClick={closeMenu}
                className="flex items-center mt-5"
              >
                <Twemoji className="w-auto mr-5 h-7" emoji="🐥" /> Lists
              </Anchor>
            </li>
            <li>
              <Anchor
                to={pagesPath.collections.$url().pathname}
                onClick={closeMenu}
                className="flex items-center mt-5"
              >
                <Twemoji className="w-auto mr-5 h-7" emoji="🔖" /> Collections
              </Anchor>
            </li>
            <li className="flex items-center mt-5">
              <Twemoji className="w-auto mr-5 h-7" emoji="🤖" /> My page
            </li>
          </ul>
          {session && (
            <div className="absolute bottom-5 left-8">
              <div className="leading-snug underline">
                Signed in as {session.user.email}
              </div>
              <button
                onClick={() => signOut()}
                className="p-3 mt-10 border rounded"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          onClick={closeMenu}
        />
      </div>

      {/* round type 2 */}
      <div
        className="fixed top-0 left-0 flex items-center justify-center w-24 h-18"
        onClick={toggleMenu}
      >
        <div className="w-8 h-8 overflow-hidden border rounded-full">
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col justify-between w-full h-3">
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
            </div>
          </div>
        </div>
      </div>

      {/* square type */}
      {/* <div className="fixed w-8 h-8 border rounded top-4 left-8">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col justify-between w-4 h-3">
            <div className="w-full h-px bg-white" />
            <div className="w-full h-px bg-white" />
            <div className="w-full h-px bg-white" />
          </div>
        </div>
      </div> */}
    </>
  )
}
