import { useState } from "react"

type ContadorProps = {
    titulo: string
    valorInicial?: number
    step?: number
    max: number
}

function Contador({ titulo, step = 1, valorInicial = 0, max }: ContadorProps) {
    const [valor, setValor] = useState(valorInicial)
    return (
        <>
            <div>
                <h3>{titulo}</h3>
                <p>Has pulsado {valor} veces</p>
                <button onClick={() => setValor(valor + step >= max ? max : valor + step)}>Pulsar</button>

            </div>
        </>
    )
}

export default Contador