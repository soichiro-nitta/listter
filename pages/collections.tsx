import { motion } from '@soichiro_nitta/motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Header } from '~/components/Header'
import { useCollection } from '~/lib/hooks/swr'

const Page: React.FC<{}> = () => {
  const { data: collection } = useCollection()
  const [show, setShow] = useState<boolean>(false)

  const refs = {
    modal: useRef<HTMLDivElement>(null),
    plus: useRef<HTMLDivElement>(null),
  }

  const clickButton = useCallback(async () => {
    const modal = refs.modal.current
    const plus = refs.plus.current

    if (show) {
      // close
      motion.addWillChange(modal, 'transform')
      motion.addWillChange(plus, 'transform')
      motion.to(modal, 0.3, 'out', {
        translateY: '100%',
      })
      motion.to(plus, 0.6, 'out', {
        rotate: '0deg',
      })
      await motion.delay(0.3)
      motion.set(modal, { display: 'none' })
      motion.removeWillChange(modal)
      setShow(false)
    } else {
      // open
      motion.addWillChange(modal, 'transform')
      motion.addWillChange(plus, 'transform')
      motion.set(modal, { display: 'block', translateY: '100%' })
      motion.to(modal, 0.45, 'out', {
        translateY: '0%',
      })
      motion.to(plus, 0.9, 'out', {
        rotate: '-135deg',
      })
      await motion.delay(0.45)
      motion.removeWillChange(modal)
      setShow(true)
    }
  }, [refs.plus, refs.modal, show])

  useEffect(() => {
    console.log({ collection })
  }, [collection])

  return (
    <div className="">
      <Header>
        <div className="flex items-center justify-between w-full h-full">
          {/* <div className="font-bold">All collections</div> */}
          <div className="font-bold">すべてのコレクション</div>
        </div>
      </Header>

      <div className="w-full px-8 py-4 bg-secondary">
        {collection?.length} collections.
      </div>

      {/* collections list */}
      <ul className="border-t border-white border-opacity-25">
        {collection?.map((c) => (
          <li
            key={c.collection_url}
            className="flex justify-between px-8 py-4 border-b border-white border-opacity-25"
          >
            <div className="">{c.name}</div>
            <div className="">{c.visibility}</div>
          </li>
        ))}
      </ul>

      {/* modal */}
      <div
        className="fixed top-0 hidden w-full h-full bg-primary"
        ref={refs.modal}
      >
        <Header>
          <div className="flex items-center justify-between w-full h-full">
            {/* <div className="font-bold">New Collections</div> */}
            <div className="font-bold">コレクションを作成</div>
            <div
              className="flex items-center justify-center w-16 h-8 mr-12 border rounded"
              // onClick={clickClose}
            >
              Save
            </div>
          </div>
        </Header>
        modal
      </div>

      {/* button for modal */}
      <div className="fixed top-5 right-8">
        <div
          className="flex items-center justify-center w-8 h-8 border rounded"
          onClick={clickButton}
        >
          <div className="relative w-3 h-3" ref={refs.plus}>
            <div className="absolute inset-0 w-full h-px m-auto bg-white" />
            <div className="absolute inset-0 w-full h-px m-auto bg-white transform rotate-90" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
