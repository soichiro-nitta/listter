import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useToggle = (params: {
  off: () => Promise<void>
  on: () => Promise<void>
}): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const { off, on } = params
  const [state, setState] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      if (!inProgress) {
        setInProgress(true)
        state ? await on() : await off()
        setInProgress(false)
      }
    })()
  }, [off, inProgress, on, state])

  return [state, setState]
}
