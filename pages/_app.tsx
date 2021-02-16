import '~/styles/global.css'

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import { Overview } from '~/components/Overview'

const _App: React.FC<AppProps> = (props) => {
  return (
    <Provider session={props.pageProps.session}>
      <div
        id="page"
        className="fixed inset-0 w-full h-full m-auto overflow-auto pt-18 "
      >
        <div className="w-full h-full pt-px scroller">
          <props.Component {...props.pageProps} />
        </div>

        {/* footer */}
        {/* <div className="h-px mx-auto mt-24 bg-white opacity-25 w-inner" />
        <div className="my-24 ml-8 font-bold font-Syne">
          <span className="opacity-50">© 2020 </span>Nitta.Studio
          <span className="opacity-50"> Inc.</span>
        </div> */}
      </div>
      <Overview />
    </Provider>
  )
}

export default _App
