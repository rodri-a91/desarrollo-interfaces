import { useState } from "react"
import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio8 from "../ejercicios/Ejercicio8"

type Tarea = { id: number, texto: string, hecha: boolean }

const tareasIniciales: Tarea[] = [
    { id: 1, texto: 'Hacer el ejercicio 7', hecha: true },
    { id: 2, texto: 'Hacer el ejercicio 8', hecha: false },
    { id: 3, texto: 'Rehacer CarritoStock', hecha: false },
]

function ListaTareas() {
    const [tareas, setTareas] = useState(tareasIniciales)

    const alternar = (id: number) => {
        setTareas(anteriores => anteriores.map(t => t.id === id ? { ...t, hecha: !t.hecha } : t))
    }

    const pendientes = tareas.filter(t => !t.hecha).length

    return (
        <div>
            <ul>
                {tareas.map(t => (
                    <li key={t.id}>
                        <label className={t.hecha ? 'tachado' : ''}>
                            <input type="checkbox" checked={t.hecha} onChange={() => alternar(t.id)} /> {t.texto}
                        </label>
                    </li>
                ))}
            </ul>
            <p>Te quedan {pendientes} tareas</p>
        </div>
    )
}

type Item = { id: number, nombre: string, stock: number }

const itemsIniciales: Item[] = [{ id: 1, nombre: 'Teclado', stock: 10 }]

function MutarVsCopiar() {
    const [mal, setMal] = useState(itemsIniciales.map(i => ({ ...i })))
    const [bien, setBien] = useState(itemsIniciales)

    const restarMal = () => {
        setMal(anteriores => anteriores.map(item => {
            // ❌ modifica el objeto que ya estaba en el estado
            if (item.id === 1) item.stock--
            return item
        }))
    }

    const restarBien = () => {
        setBien(anteriores => anteriores.map(item => item.id === 1 ? { ...item, stock: item.stock - 1 } : item))
    }

    return (
        <div>
            <p>Mutando: quedan <strong>{mal[0].stock}</strong> <button onClick={restarMal}>-1</button></p>
            <p>Copiando: quedan <strong>{bien[0].stock}</strong> <button onClick={restarBien}>-1</button></p>
            <small>En desarrollo (StrictMode) el de arriba resta de 2 en 2.</small>
        </div>
    )
}

const solucion = `
import { useState } from "react"

type Lenguaje = {
    id: number
    nombre: string
    votos: number
}

const iniciales: Lenguaje[] = [
    { id: 1, nombre: 'TypeScript', votos: 0 },
    { id: 2, nombre: 'Java', votos: 0 },
    { id: 3, nombre: 'Python', votos: 0 },
    { id: 4, nombre: 'Kotlin', votos: 0 },
]

function Ejercicio8() {
    const [lenguajes, setLenguajes] = useState(iniciales)

    const cambiarVotos = (id: number, cambio: number) => {
        setLenguajes(anteriores => anteriores.map(l =>
            l.id === id ? { ...l, votos: Math.max(0, l.votos + cambio) } : l
        ))
    }

    const reiniciar = () => {
        setLenguajes(anteriores => anteriores.map(l => ({ ...l, votos: 0 })))
    }

    const total = lenguajes.reduce((suma, l) => suma + l.votos, 0)
    const ganador = lenguajes.reduce((mejor, l) => l.votos > mejor.votos ? l : mejor)

    return (
        <div>
            <ul>
                {lenguajes.map(l => (
                    <li key={l.id}>
                        {l.nombre}: {l.votos}{' '}
                        <button onClick={() => cambiarVotos(l.id, 1)}>+1</button>
                        <button onClick={() => cambiarVotos(l.id, -1)} disabled={l.votos === 0}>-1</button>
                    </li>
                ))}
            </ul>
            <p>Total de votos: {total}</p>
            <p>{total === 0 ? 'Todavía no hay votos' : \`Va ganando: \${ganador.nombre}\`}</p>
            <button onClick={reiniciar} disabled={total === 0}>Reiniciar</button>
        </div>
    )
}

export default Ejercicio8
`

function L8ActualizarObjetos() {
    return (
        <article className="leccion">
            <h2>8 · Modificar un objeto dentro de un array</h2>

            <p>
                Es la operación clave de <C>CarritoStock</C>: "a este producto súmale 1 a la cantidad y deja el resto igual".
                Se hace con <C>map</C> + ternario + spread:
            </p>

            <Codigo titulo="El patrón (apréndetelo de memoria)">{`
setLista(anterior => anterior.map(item =>
    item.id === id               // ¿es el que quiero cambiar?
        ? { ...item, cantidad: item.cantidad + 1 }   // sí → copia NUEVA con el cambio
        : item                                       // no → lo dejo tal cual
))
`}</Codigo>

            <p>Leído en castellano: "recorre la lista; si es el elemento que busco devuelve una copia con el campo cambiado; si no, devuélvelo igual".</p>

            <Demo><ListaTareas /></Demo>
            <Codigo>{`
const alternar = (id: number) => {
    setTareas(anteriores => anteriores.map(t => t.id === id ? { ...t, hecha: !t.hecha } : t))
}

const pendientes = tareas.filter(t => !t.hecha).length   // valor derivado
`}</Codigo>

            <h3>¿Por qué no vale item.cantidad++?</h3>
            <p>
                Porque modifica el objeto que <strong>ya está en el estado</strong>. Además, en desarrollo
                <C>StrictMode</C> (lo tienes en <C>main.tsx</C>) ejecuta dos veces las funciones que pasas a
                <C>setX</C> para ayudarte a detectar justo este error:
            </p>
            <Demo><MutarVsCopiar /></Demo>
            <Nota tipo="error" titulo="Si algo te suma o resta de 2 en 2...">
                ...es casi seguro que estás mutando dentro de un <C>{'setX(anterior => ...)'}</C>. Busca un
                <C>++</C>, <C>--</C>, <C>+=</C>, <C>push</C> o una asignación <C>item.algo = ...</C> y cámbialo por una copia
                con <C>{'{ ...item, algo: nuevoValor }'}</C>.
            </Nota>

            <h3>Varias operaciones juntas</h3>
            <Codigo>{`
// Modificar TODOS los elementos (p. ej. poner a 0)
setLista(anterior => anterior.map(item => ({ ...item, votos: 0 })))
//                                        ↑ ojo a los paréntesis: devolver un objeto en una flecha

// Modificar uno, o eliminarlo si se queda a 0
setLista(anterior => {
    const elemento = anterior.find(item => item.id === id)
    if (elemento?.cantidad === 1) {
        return anterior.filter(item => item.id !== id)
    }
    return anterior.map(item => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item)
})
`}</Codigo>

            <Nota tipo="info" titulo="¿Qué es elemento?.cantidad">
                <C>find</C> puede devolver <C>undefined</C> si no encuentra nada. <C>?.</C> evita el error:
                si <C>elemento</C> es <C>undefined</C>, toda la expresión vale <C>undefined</C> en vez de romper.
            </Nota>

            <Ejercicio
                numero={8}
                enunciado={
                    <>
                        <p>Haz un marcador de votos con este estado inicial:</p>
                        <Codigo>{`
type Lenguaje = { id: number, nombre: string, votos: number }

const iniciales: Lenguaje[] = [
    { id: 1, nombre: 'TypeScript', votos: 0 },
    { id: 2, nombre: 'Java', votos: 0 },
    { id: 3, nombre: 'Python', votos: 0 },
    { id: 4, nombre: 'Kotlin', votos: 0 },
]
`}</Codigo>
                        <ul>
                            <li>Cada lenguaje tiene botones <strong>+1</strong> y <strong>-1</strong>. Los votos nunca bajan de 0 (y el -1 se desactiva en 0).</li>
                            <li>Muestra el total de votos y "Va ganando: X" (o "Todavía no hay votos").</li>
                            <li>Un botón "Reiniciar" que pone todos a 0.</li>
                            <li>Intenta hacer +1 y -1 con <strong>una sola función</strong> <C>cambiarVotos(id, cambio)</C>.</li>
                        </ul>
                    </>
                }
                pistas={[
                    "useState(iniciales) — TypeScript deduce el tipo Lenguaje[] solo.",
                    "cambiarVotos usa el patrón: map(l => l.id === id ? { ...l, votos: l.votos + cambio } : l)",
                    "Para no bajar de 0: Math.max(0, l.votos + cambio)",
                    "Ganador: lenguajes.reduce((mejor, l) => l.votos > mejor.votos ? l : mejor)",
                ]}
                solucion={solucion}
            >
                <Ejercicio8 />
            </Ejercicio>
        </article>
    )
}

export default L8ActualizarObjetos
