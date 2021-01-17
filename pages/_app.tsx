import '~/styles/global.css'

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

const Page: React.FC<AppProps> = (props) => {
  return (
    <Provider session={props.pageProps.session}>
      {/* header's border */}
      <div className="fixed top-0 w-full border-b border-white h-18 border-opacity-25" />

      <div
        id="page"
        className="fixed inset-0 w-full h-full m-auto overflow-auto pt-18 scroller"
      >
        <props.Component {...{ ...props.pageProps }} />

        {/* footer */}
        {/* <div className="h-px mx-auto mt-24 bg-white opacity-25 w-inner" />
        <div className="my-24 ml-8 font-bold font-Syne">
          <span className="opacity-50">© 2020 </span>Nitta.Studio
          <span className="opacity-50"> Inc.</span>
        </div> */}
      </div>

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

      {/* round type 2 */}
      <div className="fixed w-8 h-8 overflow-hidden border rounded-full top-5 left-8">
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
