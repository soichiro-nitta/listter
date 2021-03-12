import { motion } from '@soichiro_nitta/motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Header } from '~/components/Header'
import { useCollection } from '~/lib/hooks/swr'
import { useMotion } from '~/lib/hooks/useMotion'
import { createCollection } from '~/lib/requests'

const Page = () => {
  const { data: collection, revalidate } = useCollection()
  const form = useForm()
  // form.watch('title')

  const refs = {
    error: useRef<HTMLDivElement>(null),
    modal: useRef<HTMLDivElement>(null),
    plus: useRef<HTMLDivElement>(null),
  }

  const [modal, setModal] = useMotion({
    enter: async () => {
      const m = refs.modal.current
      const p = refs.plus.current
      motion.addWillChange(m, 'transform, opacity')
      motion.addWillChange(p, 'transform')
      motion.set(m, { display: 'block', opacity: 0, translateX: '10%' })
      motion.to(m, 0.5, 'out', {
        opacity: '1',
        translateX: '0%',
      })
      motion.to(p, 0.5, 'out', {
        rotate: '135deg',
      })
      await motion.delay(0.5)
      motion.removeWillChange(m)
      motion.removeWillChange(p)
    },
    leave: async () => {
      const m = refs.modal.current
      const p = refs.plus.current
      motion.addWillChange(m, 'transform, opacity')
      motion.addWillChange(p, 'transform')
      motion.to(m, 0.5, 'out', {
        opacity: '0',
        translateX: '10%',
      })
      motion.to(p, 0.5, 'out', {
        rotate: '0deg',
      })
      await motion.delay(0.5)
      motion.set(m, { display: 'none' })
      motion.removeWillChange(m)
      motion.removeWillChange(p)
    },
  })

  const toggleModal = useCallback(() => setModal(!modal), [modal, setModal])

  const clickSave = useCallback(
    async (data) => {
      const modal = refs.modal.current
      const plus = refs.plus.current
      if (modal && plus) {
        await createCollection({ name: data.title })
        revalidate() // TODO: 差分を取得して差分のみアニメーションしたい
        setModal(false)
        form.reset()
      }
    },
    [form, refs.modal, refs.plus, revalidate, setModal]
  )

  useEffect(() => {
    console.log({ collection })
  }, [collection])

  // error
  useEffect(() => {
    ;(async () => {
      const error = refs.error.current
      if (error) {
        if (form.errors.title) {
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
  }, [form.errors.title, refs.error])

  return (
    <div className="">
      <Header>
        <div className="font-bold">All Collections</div>
        {/* <div className="font-bold">すべてのコレクション</div> */}
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
              onClick={form.handleSubmit(clickSave)}
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
            ref={form.register({ required: true })}
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
          onClick={toggleModal}
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
