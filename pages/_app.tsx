import '~/styles/global.css'

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import { Overview } from '~/components/Overview'

const _App: React.FC<AppProps> = (props) => {
  return (
    <Provider session={props.pageProps.session}>
      <div id="page" className="fixed inset-0 w-full h-full pt-18 ">
        <div className="w-full h-full pt-px overflow-auto scroller">
          <props.Component {...props.pageProps} />
        </div>
      </div>
      <Overview />
    </Provider>
  )
}

export default _App
