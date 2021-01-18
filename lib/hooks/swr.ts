import useSwr, { mutate } from 'swr'

import { Collection, List, Timeline } from '../types'

const fetcher = (url: string): any => fetch(url).then((res) => res.json())

export const useList = (): { data: List; error: any; loading: boolean } => {
  const { data, error } = useSwr('/api/list', fetcher)

  return {
    data,
    error,
    loading: !error && !data,
  }
}

export const useTimeline = (params: {
  id: string
}): { data: Timeline; error: any; loading: boolean } => {
  const { id } = params
  const { data, error } = useSwr(`/api/list/${id}`, fetcher)

  return {
    data,
    error,
    loading: !error && !data,
  }
}

export const useCollection = (): {
  data: Collection
  error: any
  loading: boolean
  revalidate: () => void
} => {
  const key = '/api/collection'
  const { data, error } = useSwr(key, fetcher)
  // TODO: 差分のmutateをおこなう
  const revalidate = () => {
    mutate(key)
  }

  return {
    data,
    error,
    loading: !error && !data,
    revalidate,
  }
}
