export const Header: React.FC<{}> = (props) => {
  return (
    <div className="fixed top-0 w-full h-16 pl-24 pr-8 overflow-hidden">
      {props.children}
    </div>
  )
}
