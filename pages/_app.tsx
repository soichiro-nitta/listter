import '~/styles/global.css'

import { motion } from '@soichiro_nitta/motion'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { useEffect, useRef } from 'react'

const Page: React.FC<AppProps> = (props) => {
  const refs = {
    logo: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    const page = document.getElementById('page')
    const logo = refs.logo.current
    if (page && logo) {
      let process = false
      let position = page.scrollTop
      motion.addWillChange(logo, 'opacity, transform')
      page.addEventListener('scroll', async () => {
        if (!process) {
          process = true
          if (position > page.scrollTop) {
            motion.to(logo, 0.5, 'out', { opacity: 1, translateY: '0px' })
          } else {
            motion.to(logo, 0.5, 'out', { opacity: 0, translateY: '-10px' })
          }
          position = page.scrollTop
          await motion.delay(0.5)
          if (page.scrollTop <= 0) {
            motion.to(logo, 0.5, 'out', { opacity: 1, translateY: '0px' })
            await motion.delay(0.5)
          }
          process = false
        }
      })
    }
  }, [refs.logo])

  return (
    <Provider session={props.pageProps.session}>
      <div
        ref={refs.logo}
        className="fixed flex items-center text-3xl font-bold font-Syne top-8 left-8 h-14"
      >
        Listter.app
      </div>
      <div
        id="page"
        className="fixed inset-0 w-full h-full m-auto overflow-auto pt-30 scroller"
      >
        <props.Component {...{ ...props.pageProps }} />
        <div className="h-px mx-auto mt-24 bg-white opacity-25 w-inner" />
        <div className="my-24 ml-8 font-bold font-Syne">
          <span className="opacity-50">© 2020 </span>Nitta.Studio
          <span className="opacity-50"> Inc.</span>
        </div>
      </div>
    </Provider>
  )
}

export default Page
