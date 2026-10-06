import { useState } from "react"

function EjemploInput() {
    const [texto, setTexto] = useState<string>('')
    const [texto2, setTexto2] = useState<string>('')
    return (
        <div>
            <h2>EjemploInput</h2>
            <input onChange={(e) => setTexto(e.target.value)} type="text" placeholder="Introduce un texto..."></input><br/>
            <input onChange={(e) => setTexto2(e.target.value)} type="text" placeholder="Introduce un texto..."></input>
            <p>Escribiste: {texto}</p>
            <p>Escribiste: {texto2}</p>
        </div>
    )
}

export default EjemploInput