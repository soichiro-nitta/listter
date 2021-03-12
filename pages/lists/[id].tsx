import clsx from 'clsx'
import { useRouter } from 'next/router'

import { useTimeline } from '~/lib/hooks/swr'

const Page = () => {
  const id = (useRouter().query.id || '') as string

  const { data: timeline } = useTimeline({ id })

  // const clickTweet = ({ currentTarget }) => {
  //   const id = currentTarget.getAttribute('data-id')
  //   console.log({ id })
  //   fetch('/api/collection', {
  //     body: JSON.stringify({ id }),
  //     headers: {
  //       'Content-Type': 'application/json; charset=utf-8',
  //     },
  //     method: 'POST',
  //   })
  // }

  return (
    <>
      {/* timeline */}
      {timeline?.length !== 0 ? (
        <ul className="px-8">
          {timeline?.map((tweet) => (
            <li
              key={tweet.id_str}
              className="flex justify-between mt-8"
              data-id={tweet.id_str}
              // onClick={clickTweet}
            >
              <div className="w-16 h-16">
                <img
                  {...{
                    src: tweet.user.profile_image_url,
                  }}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              <div className="w-92 font-inter">
                <div className="flex">
                  <div className="font-bold">{tweet.user.name}</div>
                  <div className="ml-2">@{tweet.user.screen_name}</div>
                </div>
                <div className="mt-2">{tweet.created_at}</div>
                <div className="mt-2 leading-snug">{tweet.text}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>nothing</>
      )}
    </>
  )
}

export default Page
