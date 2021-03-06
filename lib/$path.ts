/* eslint-disable */
export const pagesPath = {
  api: {
    auth: {
      _nextauth: (nextauth: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/api/auth/[...nextauth]' as const, query: { nextauth }, hash: url?.hash })
      })
    },
    collections: {
      $url: (url?: { hash?: string }) => ({ pathname: '/api/collections' as const, hash: url?.hash })
    },
    lists: {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/api/lists/[id]' as const, query: { id }, hash: url?.hash })
      }),
      $url: (url?: { hash?: string }) => ({ pathname: '/api/lists' as const, hash: url?.hash })
    }
  },
  collections: {
    $url: (url?: { hash?: string }) => ({ pathname: '/collections' as const, hash: url?.hash })
  },
  lists: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/lists/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/lists' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {

} as const

export type StaticPath = typeof staticPath
