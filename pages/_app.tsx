import '~/styles/global.css'

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import { Layout } from '~/components/Layout'

const _App: React.FC<AppProps> = (props) => {
  return (
    <Provider session={props.pageProps.session}>
      <Layout {...props} />
    </Provider>
  )
}

export default _App
