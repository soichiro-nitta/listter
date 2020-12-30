import '~/styles/global.css'

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

const Page: React.FC<AppProps> = (props) => {
  return (
    <Provider session={props.pageProps.session}>
      <div
        id="page"
        className="fixed inset-0 w-full h-full m-auto overflow-auto scroller"
      >
        <props.Component {...{ ...props.pageProps }} />
        <div className="h-px mx-auto mt-24 bg-white opacity-25 w-inner" />
        <div className="my-24 ml-8 font-bold">
          <span className="opacity-50">© 2020 </span>Nitta.Studio
          <span className="opacity-50"> Inc.</span>
        </div>
      </div>
    </Provider>
  )
}

export default Page
