// EJERCICIO 3 · Contador con límites
// El enunciado completo está en el tutorial (lección 3).
//
// 1. import { useState } from "react"
// 2. const [valor, setValor] = useState(0)
// 3. Botones -1, +1, +3 y Reset, con disabled cuando toque.
// 4. Mensaje "¡Máximo alcanzado!" al llegar a 10.
//
// Cuando lo tengas, borra el <p> de abajo y devuelve tu JSX.
// Guarda el archivo y verás el resultado al momento en la lección.

import { useState } from "react"





function Ejercicio3() {
    const [contador, setContador] = useState(0)
    return <p className="pendiente">
        <h3>Contador: {contador}</h3>
        <button onClick={() => setContador(prev => prev - 1)} disabled={contador === 0}>-1</button>
        <button onClick={() => setContador(prev => prev + 1)} disabled={contador === 10}>+1</button>
        <button onClick={() => setContador(prev => Math.min(prev + 3, 10))} disabled={contador === 10}>+3</button>
        <button onClick={() => setContador(0)}>Reset</button>
        <br></br>{contador===10 && 'Máximo alcanzado!'}

        </p>
}

export default Ejercicio3
