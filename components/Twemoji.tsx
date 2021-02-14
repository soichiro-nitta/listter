import twemoji from 'twemoji'

export const Twemoji: React.FC<{
  className: string
  emoji: string
}> = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(props.emoji, {
          className: props.className,
          ext: '.svg',
          folder: 'svg',
        }),
      }}
    />
  )
}
