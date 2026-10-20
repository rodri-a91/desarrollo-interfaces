import { useState } from "react"

function Saludo() {
    const [nombre, setNombre] = useState('')
    const [nombreTemp, setNombreTemp] = useState('')

  return (
    <>
    <label>Nombre</label><br></br>
    <input type="text" placeholder="Introduce tu nombre..." value={nombreTemp}
    onChange={(e) => setNombreTemp(e.target.value)}/> <button onClick={() => setNombre(nombreTemp)}>Saludar</button>
    {nombre && <p>Hola, {nombre}</p>}
    
    </>
  )
}

export default Saludo