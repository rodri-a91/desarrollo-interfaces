import { useState } from "react"
import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio3 from "../ejercicios/Ejercicio3"

function ContadorRoto() {
    let valor = 0
    return (
        <p>
            Variable normal: {valor}{' '}
            {/* eslint-disable-next-line react-hooks/immutability -- error a propósito: el linter también te avisa */}
            <button onClick={() => { valor = valor + 1; console.log('valor vale', valor) }}>+1</button>
            <small> (mira la consola: cambia, pero la pantalla no)</small>
        </p>
    )
}

function ContadorBien() {
    const [valor, setValor] = useState(0)
    return (
        <p>
            Con useState: {valor} <button onClick={() => setValor(valor + 1)}>+1</button>
        </p>
    )
}

function SumarTres() {
    const [valor, setValor] = useState(0)

    const mal = () => {
        setValor(valor + 1)
        setValor(valor + 1)
        setValor(valor + 1)
    }
    const bien = () => {
        setValor(v => v + 1)
        setValor(v => v + 1)
        setValor(v => v + 1)
    }

    return (
        <p>
            Valor: <strong>{valor}</strong>{' '}
            <button onClick={mal}>+3 (mal)</button>
            <button onClick={bien}>+3 (bien)</button>
            <button onClick={() => setValor(0)}>Reset</button>
        </p>
    )
}

const solucion = `
import { useState } from "react"

const MIN = 0
const MAX = 10

function Ejercicio3() {
    const [valor, setValor] = useState(0)

    return (
        <div>
            <h3>{valor}</h3>
            <button onClick={() => setValor(v => v - 1)} disabled={valor === MIN}>-1</button>
            <button onClick={() => setValor(v => v + 1)} disabled={valor === MAX}>+1</button>
            <button onClick={() => setValor(v => Math.min(v + 3, MAX))} disabled={valor === MAX}>+3</button>
            <button onClick={() => setValor(MIN)}>Reset</button>
            {valor === MAX && <p>¡Máximo alcanzado!</p>}
        </div>
    )
}

export default Ejercicio3
`

function L3Estado() {
    return (
        <article className="leccion">
            <h2>3 · Estado (useState) y eventos</h2>

            <p>
                Las props vienen de fuera y el componente no las cambia. Cuando un componente necesita
                <strong> recordar algo que cambia</strong> (un contador, un texto, un carrito…) usa <strong>estado</strong>.
            </p>

            <h3>¿Por qué no vale una variable normal?</h3>
            <Demo>
                <ContadorRoto />
                <ContadorBien />
            </Demo>
            <p>
                React solo vuelve a pintar el componente cuando cambias el estado con su función <C>set</C>.
                Una variable con <C>let</C> cambia, pero React no se entera, y además en cada render vuelve a valer 0.
            </p>

            <Codigo titulo="Anatomía de useState">{`
import { useState } from "react"

const [valor, setValor] = useState<number>(0)
//      ↑       ↑                   ↑      ↑
//   el dato  función para    tipo (opcional,   valor inicial
//            cambiarlo       TS lo deduce)
`}</Codigo>

            <h3>Eventos: pasar una función, no llamarla</h3>
            <Codigo>{`
<button onClick={sumar}>         ✅ le paso la función; React la llamará al hacer clic
<button onClick={() => sumar(5)}> ✅ necesito parámetros → la envuelvo en una flecha
<button onClick={sumar()}>       ❌ la ejecuta al PINTAR → bucle "Too many re-renders"
`}</Codigo>

            <h3>El estado no cambia "al momento"</h3>
            <p>
                Esto es lo más importante de la lección (y la causa de muchos problemas del carrito).
                Cuando llamas a <C>setValor(valor + 1)</C> la variable <C>valor</C> <strong>no cambia</strong> en esa
                ejecución: React apunta el cambio y vuelve a pintar después. Prueba los dos botones:
            </p>
            <Demo><SumarTres /></Demo>
            <Codigo>{`
const mal = () => {
    setValor(valor + 1)   // valor es 0 → pide poner 1
    setValor(valor + 1)   // valor SIGUE siendo 0 → pide poner 1
    setValor(valor + 1)   // ... resultado: 1
}

const bien = () => {
    setValor(v => v + 1)  // "coge el valor más reciente y súmale 1"
    setValor(v => v + 1)
    setValor(v => v + 1)  // resultado: 3
}
`}</Codigo>

            <Nota tipo="truco" titulo="Regla práctica">
                Si el nuevo valor <strong>depende del anterior</strong>, usa la forma con función:
                <C>{'setX(anterior => ...)'}</C>. Es lo que hiciste en <C>CarritoStock</C> con
                <C>{'setCarrito(carritoAnterior => ...)'}</C>.
            </Nota>

            <Nota tipo="error" titulo="Cuidado con el estado inicial y las props">
                <C>{'useState(valorInicial)'}</C> solo usa <C>valorInicial</C> la primera vez. Si luego la prop cambia,
                el estado no se actualiza solo.
            </Nota>

            <Ejercicio
                numero={3}
                enunciado={
                    <>
                        <p>Haz un contador con límites (como tus <C>Contador</C> y <C>Contador3</C>, pero más completo):</p>
                        <ul>
                            <li>Empieza en 0, nunca baja de 0 ni sube de 10.</li>
                            <li>Botones <strong>-1</strong>, <strong>+1</strong>, <strong>+3</strong> y <strong>Reset</strong>.</li>
                            <li>Los botones que no se pueden usar deben estar <strong>desactivados</strong> (<C>disabled</C>).</li>
                            <li>+3 estando en 9 debe dejarlo en 10, no en 12.</li>
                            <li>Cuando llegue a 10 muestra "¡Máximo alcanzado!".</li>
                        </ul>
                    </>
                }
                pistas={[
                    "Empieza escribiendo import { useState } from \"react\" y const [valor, setValor] = useState(0).",
                    "disabled acepta un booleano: disabled={valor === 0}",
                    "Math.min(a, b) devuelve el menor: Math.min(valor + 3, 10) nunca pasa de 10.",
                    "Para el mensaje usa {condicion && <p>...</p>} (lo verás a fondo en la lección 4).",
                ]}
                solucion={solucion}
            >
                <Ejercicio3 />
            </Ejercicio>
        </article>
    )
}

export default L3Estado
