import useSwr from 'swr'

export const fetcher = (url: string): any =>
  fetch(url).then((res) => res.json())

export const useRequest = (path: string): any => {
  const { data, error } = useSwr(path, fetcher)
  if (error) console.log('SWR: failed to load')
  return data
}
