import { useState } from "react"

type ContadorProps = {
    titulo: string
    valorInicial?: number
    step?: number
}

function Contador3({ titulo, valorInicial = 0, step = 1 }: ContadorProps) {
    const [valor, setValor] = useState(valorInicial)
    return (
        <>
            <div>
                <h3>{titulo}</h3>
                <p>Valor: {valor}</p>
                <button onClick={() => setValor(valor - step)}>Restar</button>
                <button onClick={() => setValor(valorInicial)}>Reiniciar</button>
                <button onClick={() => setValor(valor + step)}>Sumar</button>

            </div>
        </>
    )
}

export default Contador3