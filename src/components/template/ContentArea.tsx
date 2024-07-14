interface ContentAreaProps {
  children: any
  className?: string
}

export default function ContentArea(props: ContentAreaProps) {
  return (
    <div
      className={`
            flex flex-col p-7
            ${props.className ?? ''}
        `}
    >
      {props.children}
    </div>
  )
}
