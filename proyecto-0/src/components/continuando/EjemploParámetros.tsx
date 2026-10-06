import { useState } from "react"

function EjemploParámetros() {
    const [color, setColor] = useState('')
  return (
    <div>
        <p>Color: {color}</p>
        <button onClick={() => {setColor('🟥')}}>Rojo</button>
        <button onClick={() => {setColor('🟨')}}>Amarillo</button>
        <button onClick={() => {setColor('🟩')}}>Verde</button>
        <button onClick={() => {setColor('')}}>Reset</button>
    </div>
  )
}

export default EjemploParámetros