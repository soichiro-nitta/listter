import Link from 'next/link'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'

export const Anchor: React.FC<{
  className?: string
  href: string | UrlObject
  onClick?: () => void
}> = (props) => {
  const router = useRouter()

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (props.onClick) props.onClick()

    router.push(props.href)

    router.events.on('routeChangeComplete', () => {
      const page = document.getElementById('page')
      if (page) page.scrollTop = 0
    })
  }

  return (
    <Link {...{ href: props.href }}>
      <a {...{ className: props.className, onClick }}>{props.children}</a>
    </Link>
  )
}
