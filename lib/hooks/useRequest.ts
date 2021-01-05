/* eslint-disable @typescript-eslint/no-explicit-any */
import useSwr from 'swr'

import { Timeline } from '~/lib/types'

const fetcher = (url: string): any => fetch(url).then((res) => res.json())

export const useGetTimeline = (
  path: string
): { error: any; timeline: Timeline } => {
  const { data: _timeline, error } = useSwr(path, fetcher)

  return { error, timeline: _timeline || [] }
}
