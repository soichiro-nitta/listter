import { useEffect, useRef } from 'react'

import { Header } from '~/components/Header'
import { useCollection } from '~/lib/hooks/swr'

const Page: React.FC<{}> = (props) => {
  const { data: collection } = useCollection()
  const refs = {
    modal: useRef<HTMLDivElement>(null),
  }

  const clickNew = () => {
    const modal = refs.modal.current
    modal.style.display = 'block'
  }

  useEffect(() => {
    console.log({ collection })
  }, [collection])

  return (
    <div className="">
      <div>collection page</div>
      <Header>
        <div className="flex items-center justify-between w-full h-full">
          <div className="font-bold">Collections</div>
          <div
            className="flex items-center justify-center w-8 h-8 border rounded"
            onClick={clickNew}
          >
            ＋
          </div>
        </div>
      </Header>

      <div
        className="fixed top-0 hidden w-full h-full bg-black"
        ref={refs.modal}
      >
        modal
      </div>
      <ul className="mt-8">
        {collection?.map((c) => (
          <li key={c.collection_url}>
            {c.name}
            <div className="h-px mx-auto mt-24 bg-white opacity-25 w-inner" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
