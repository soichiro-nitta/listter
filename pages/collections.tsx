import { motion } from '@soichiro_nitta/motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Header } from '~/components/Header'
import { useCollection } from '~/lib/hooks/swr'
import { createCollection } from '~/lib/requests'

const Page: React.FC<{}> = () => {
  const { data: collection, revalidate } = useCollection()
  const [show, setShow] = useState<boolean>(false)

  const { errors, handleSubmit, register, reset, watch } = useForm()
  // watch('title')

  const refs = {
    error: useRef<HTMLDivElement>(null),
    modal: useRef<HTMLDivElement>(null),
    plus: useRef<HTMLDivElement>(null),
  }

  // TODO: モーダルの挙動をリファクタ
  const closeModal = useCallback(async () => {
    const modal = refs.modal.current
    const plus = refs.plus.current
    motion.addWillChange(modal, 'transform, opacity')
    motion.addWillChange(plus, 'transform')
    motion.to(modal, 0.3, 'out', {
      opacity: '0',
      translateX: '10%',
    })
    motion.to(plus, 0.6, 'out', {
      rotate: '0deg',
    })
    await motion.delay(0.3)
    motion.set(modal, { display: 'none' })
    motion.removeWillChange(modal)
    setShow(false)
    await motion.delay(0.3)
    motion.removeWillChange(plus)
  }, [refs.modal, refs.plus])

  const clickButton = useCallback(async () => {
    const modal = refs.modal.current
    const plus = refs.plus.current
    if (show) {
      // close
      closeModal()
    } else {
      // open
      motion.addWillChange(modal, 'transform, opacity')
      motion.addWillChange(plus, 'transform')
      motion.set(modal, { display: 'block', opacity: 0, translateX: '10%' })
      motion.to(modal, 0.45, 'out', {
        opacity: '1',
        translateX: '0%',
      })
      motion.to(plus, 0.9, 'out', {
        rotate: '135deg',
      })
      await motion.delay(0.45)
      motion.removeWillChange(modal)
      setShow(true)
      await motion.delay(0.45)
      motion.removeWillChange(plus)
    }
  }, [refs.modal, refs.plus, show, closeModal])

  const clickSave = useCallback(
    async (data) => {
      const modal = refs.modal.current
      const plus = refs.plus.current
      if (modal && plus) {
        await createCollection({ name: data.title })
        revalidate() // TODO: 差分を取得して差分のみアニメーションしたい
        closeModal()
        reset()
      }
    },
    [closeModal, refs.modal, refs.plus, reset, revalidate]
  )

  useEffect(() => {
    console.log({ collection })
  }, [collection])

  useEffect(() => {
    ;(async () => {
      const error = refs.error.current
      if (error) {
        if (errors.title) {
          // error
          motion.set(error, {
            display: 'block',
            opacity: '0',
            translateX: '-5%',
          })
          motion.to(error, 0.6, 'out', { opacity: '1', translateX: '0%' })
        } else {
          // no error
          motion.to(error, 0.6, 'out', { opacity: '0', translateX: '-5%' })
          await motion.delay(0.6)
          motion.set(error, { display: 'none' })
        }
      }
    })()
  }, [errors.title, refs.error])

  return (
    <div className="">
      <Header>
        <div className="flex items-center justify-between w-full h-full">
          <div className="font-bold">All collections</div>
          {/* <div className="font-bold">すべてのコレクション</div> */}
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
        className="fixed inset-0 hidden w-full h-full m-auto bg-primary pt-18"
        ref={refs.modal}
      >
        <Header>
          <div className="flex items-center justify-between w-full h-full">
            <div className="font-bold">New Collections</div>
            {/* <div className="font-bold">コレクションを作成</div> */}

            {/* save button */}
            <div
              className="flex items-center justify-center w-16 h-8 mr-12 border rounded"
              onClick={handleSubmit(clickSave)}
            >
              Save
            </div>
          </div>
        </Header>

        {/* header's border */}
        {/* <div className="fixed top-0 w-full h-px bg-white opacity-25 mt-18" /> */}

        <form className="mt-px">
          <textarea
            placeholder="Collection title"
            maxLength={512}
            className="w-full h-10 px-8 my-10 text-2xl leading-snug"
            ref={register({ required: true })}
            name="title"
          />
          {/* <textarea
            placeholder="Collection title"
            className="w-full px-8 py-12 text-2xl"
          /> */}
        </form>

        <div className="fixed top-auto hidden inset-8" ref={refs.error}>
          errorだよ
        </div>
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
