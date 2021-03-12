import { signIn, signOut, useSession } from 'next-auth/client'

const Page = () => {
  const [session, loading] = useSession()

  return (
    <div className="">
      {session ? (
        <>ログイン済み</>
      ) : (
        <>
          <div className="underline">Not signed in</div>
          <button onClick={() => signIn('twitter')} className="p-3 mt-8 border">
            Sign in
          </button>
        </>
      )}
    </div>
  )
}

export default Page
