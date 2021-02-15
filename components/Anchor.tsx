import { useRouter } from 'next/router'

export const Anchor: React.FC<{
  className?: string
  onClick?: () => void
  to: string
}> = (props) => {
  const router = useRouter()

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    props.onClick()

    router.push(props.to)

    router.events.on('routeChangeComplete', () => {
      const page = document.getElementById('page')
      if (page) page.scrollTop = 0
    })
  }

  return (
    <a {...{ className: props.className, href: props.to, onClick }}>
      {props.children}
    </a>
  )
}
