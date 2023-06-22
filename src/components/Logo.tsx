
//the style props should follow tailwind's convention
const Logo:React.FC<{ fontSize:string }> = ({ fontSize }) => {
  return (

    <h1 className={`font-black ${fontSize} py-2 `}>discu.</h1>
  )
}

export default Logo