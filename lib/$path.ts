/* eslint-disable */
export const pagesPath = {
  api: {
    auth: {
      _nextauth: (nextauth: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/api/auth/[...nextauth]' as const, query: { nextauth }, hash: url?.hash })
      })
    }
  },
  auth: {
    error: {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/error' as const, hash: url?.hash })
    }
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {

} as const

export type StaticPath = typeof staticPath
