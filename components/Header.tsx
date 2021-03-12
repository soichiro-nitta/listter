export const Header: React.FC<{}> = (props) => {
  return (
    <div className="fixed top-0 w-full pl-24 pr-8 overflow-hidden h-18">
      <div className="flex items-center justify-between w-full h-full">
        {props.children}
      </div>
    </div>
  )
}
