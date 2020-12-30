// import { GetStaticProps } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'

// import Twitter from 'twitter'
// import {
//   TWITTER_ACCESS_TOKEN_KEY,
//   TWITTER_ACCESS_TOKEN_SECRET,
//   TWITTER_CONSUMER_KEY,
//   TWITTER_CONSUMER_SECRET,
// } from '~/lib/constants'

// export const getStaticProps: GetStaticProps = async () => {
//   const client = new Twitter({
//     access_token_key: TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
//     consumer_key: TWITTER_CONSUMER_KEY,
//     consumer_secret: TWITTER_CONSUMER_SECRET,
//   })
//   const res = await client.post('lists/create', {
//     description: 'unko',
//     mode: 'private',
//     name: 'test list',
//   })

//   return {
//     props: { providers: await providers(), res },
//   }
// }

const Page: React.FC<{
  res: any
}> = (props) => {
  const [session, loading] = useSession()

  return (
    <>
      <div>page</div>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn('twitter')}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  )
}

export default Page
