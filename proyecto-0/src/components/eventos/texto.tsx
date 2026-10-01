import { useState } from "react"

function Texto() {
    const [texto, setTexto] = useState("")
  return (
    <>
    <h3>onChange()</h3>
    <input type="text" onChange={(e) => {setTexto(e.target.value)}}/>
    <button>{texto}</button>
    
    
    </>
  )
}

export default Texto