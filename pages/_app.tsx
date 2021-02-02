import '~/styles/global.css'

import { motion } from '@soichiro_nitta/motion'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { useRef, useState } from 'react'

const Page: React.FC<AppProps> = (props) => {
  const refs = {
    menu: useRef<HTMLDivElement>(null),
  }
  const [show, setShow] = useState<boolean>(false)

  const closeMenu = async () => {
    const menu = refs.menu.current
    motion.addWillChange(menu, 'transform, opacity')
    motion.to(menu, 0.45, 'out', {
      opacity: '0',
      translateX: '-10%',
    })
    await motion.delay(0.45)
    motion.removeWillChange(menu)
    setShow(false)
  }

  const clickLogo = async () => {
    const menu = refs.menu.current
    if (show) {
      // close
      closeMenu()
    } else {
      //open
      motion.addWillChange(menu, 'transform, opacity')
      motion.set(menu, { display: 'block', opacity: 0, translateX: '-10%' })
      motion.to(menu, 0.45, 'out', {
        opacity: '1',
        translateX: '0%',
      })
      await motion.delay(0.45)
      motion.removeWillChange(menu)
      setShow(true)
    }
  }

  return (
    <Provider session={props.pageProps.session}>
      <div
        id="page"
        className="fixed inset-0 w-full h-full m-auto overflow-auto pt-18 "
      >
        <div className="w-full h-full pt-px scroller">
          <props.Component {...{ ...props.pageProps }} />
        </div>

        {/* footer */}
        {/* <div className="h-px mx-auto mt-24 bg-white opacity-25 w-inner" />
        <div className="my-24 ml-8 font-bold font-Syne">
          <span className="opacity-50">© 2020 </span>Nitta.Studio
          <span className="opacity-50"> Inc.</span>
        </div> */}
      </div>

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
        menu
        <div className="absolute top-0 left-0 w-1/2 h-full border-r border-white bg-primary border-opacity-25" />
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          onClick={closeMenu}
        />
      </div>

      {/* round type 2 */}
      <div
        onClick={clickLogo}
        className="fixed w-8 h-8 overflow-hidden border rounded-full top-5 left-8"
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col justify-between w-full h-3">
            <div className="w-full h-px bg-white" />
            <div className="w-full h-px bg-white" />
            <div className="w-full h-px bg-white" />
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
    </Provider>
  )
}

export default Page

// TODO: 右方向スワイプでナビゲーションを開く
