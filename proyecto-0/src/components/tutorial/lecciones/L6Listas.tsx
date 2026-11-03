import { useState } from "react"
import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio6 from "../ejercicios/Ejercicio6"

type Alumno = {
    id: number
    nombre: string
    nota: number
}

const alumnos: Alumno[] = [
    { id: 1, nombre: "Sofía Martínez", nota: 8.5 },
    { id: 2, nombre: "Alejandro Gómez", nota: 9.2 },
    { id: 3, nombre: "Lucía Fernández", nota: 6.8 },
    { id: 4, nombre: "Carlos Mendoza", nota: 4.2 },
    { id: 5, nombre: "Elena Torres", nota: 3.5 },
]

function BuscadorAlumnos() {
    const [busqueda, setBusqueda] = useState('')

    const visibles = alumnos.filter(a => a.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    const media = visibles.reduce((suma, a) => suma + a.nota, 0) / visibles.length
    const mejor = alumnos.find(a => a.nota >= 9)

    return (
        <div>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar alumno..." />
            <ul>
                {visibles.map(a => <li key={a.id}>{a.nombre} — {a.nota}</li>)}
            </ul>
            <p>
                {visibles.length === 0
                    ? 'Ningún alumno coincide'
                    : `Mostrando ${visibles.length} de ${alumnos.length} · media ${media.toFixed(2)}`}
            </p>
            <p>Primer alumno con sobresaliente: {mejor ? mejor.nombre : 'ninguno'}</p>
        </div>
    )
}

const solucion = `
import { useState } from "react"

type Libro = {
    id: number
    titulo: string
    precio: number
    disponible: boolean
}

const libros: Libro[] = [
    { id: 1, titulo: "Clean Code", precio: 35, disponible: true },
    { id: 2, titulo: "El Quijote", precio: 12, disponible: false },
    { id: 3, titulo: "Aprendiendo React", precio: 28, disponible: true },
    { id: 4, titulo: "JavaScript: The Good Parts", precio: 22, disponible: true },
    { id: 5, titulo: "Cien años de soledad", precio: 15, disponible: false },
]

function Ejercicio6() {
    const [busqueda, setBusqueda] = useState('')
    const [soloDisponibles, setSoloDisponibles] = useState(false)
    const [ordenar, setOrdenar] = useState(false)

    let visibles = libros
        .filter(l => l.titulo.toLowerCase().includes(busqueda.toLowerCase()))
        .filter(l => !soloDisponibles || l.disponible)

    if (ordenar) {
        visibles = [...visibles].sort((a, b) => a.precio - b.precio)
    }

    const total = visibles.reduce((suma, l) => suma + l.precio, 0)

    return (
        <div>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar título..." />
            <label>
                <input type="checkbox" checked={soloDisponibles} onChange={e => setSoloDisponibles(e.target.checked)} />
                Solo disponibles
            </label>
            <label>
                <input type="checkbox" checked={ordenar} onChange={e => setOrdenar(e.target.checked)} />
                Ordenar por precio
            </label>

            {visibles.length === 0 ? <p>No hay libros</p> : (
                <ul>
                    {visibles.map(l => (
                        <li key={l.id}>{l.titulo} — {l.precio} € {!l.disponible && '(agotado)'}</li>
                    ))}
                </ul>
            )}
            <p>Mostrando {visibles.length} de {libros.length} · Total: {total} €</p>
        </div>
    )
}

export default Ejercicio6
`

function L6Listas() {
    return (
        <article className="leccion">
            <h2>6 · Listas: map, key, filter y compañía</h2>

            <p>
                Los datos casi siempre vienen en <strong>arrays de objetos</strong>. Para pintarlos usamos
                <C>map</C>, que transforma cada elemento del array en un trozo de JSX.
            </p>

            <Codigo>{`
type Modulo = { id: number, nombre: string }

const modulos: Modulo[] = [
    { id: 1, nombre: 'Desarrollo de interfaces' },
    { id: 2, nombre: 'Acceso a datos' },
]

<ul>
    {modulos.map(m => <li key={m.id}>{m.nombre}</li>)}
</ul>
`}</Codigo>

            <h3>La key</h3>
            <p>
                Cada elemento de una lista necesita una <C>key</C> <strong>única y estable</strong> para que React sepa
                cuál es cuál cuando la lista cambia. Sin ella sale el aviso que viste en <C>ListaMala</C>.
            </p>
            <Nota tipo="error" titulo="Keys que dan problemas">
                <p>• Ninguna key → aviso en consola.</p>
                <p>• <C>{'key={i}'}</C> (el índice) → falla cuando borras o reordenas elementos.</p>
                <p>• <C>{'key={Math.random()}'}</C> o <C>{'key={crypto.randomUUID()}'}</C> dentro del map → cambia en cada render.</p>
                <p>• Dos elementos con la <strong>misma key</strong> → React se lía (te pasó en <C>Carrito</C>, lo vemos en la lección 7).</p>
                <p>✅ Usa un <C>id</C> que forme parte del dato. Si lo generas con <C>crypto.randomUUID()</C>, hazlo al <strong>crear</strong> el dato, no al pintarlo.</p>
            </Nota>

            <h3>Los métodos que más vas a usar</h3>
            <Codigo>{`
lista.map(x => ...)           // transforma → array del MISMO tamaño
lista.filter(x => cond)       // se queda con los que cumplen → array igual o más pequeño
lista.find(x => cond)         // el PRIMERO que cumple, o undefined
lista.some(x => cond)         // ¿alguno cumple? → true / false
lista.reduce((acc, x) => acc + x.precio, 0)   // lo resume todo en un valor (p. ej. una suma)

// Ninguno modifica el array original: todos devuelven algo nuevo.
`}</Codigo>

            <h3>Valores derivados: no todo tiene que ser estado</h3>
            <p>
                En <C>ListaAlumnosFiltrados</C> hiciste algo muy bien: guardar en el estado solo el checkbox
                y <strong>calcular</strong> la lista visible en cada render. Lo mismo con el <C>total</C> del carrito.
            </p>
            <Codigo>{`
const [aprobados, setAprobados] = useState(false)

// ✅ se recalcula sola en cada render, nunca se desincroniza
const listaVisible = aprobados ? alumnos.filter(a => a.nota >= 5) : alumnos

// ❌ guardar listaVisible en otro useState: tendrías que acordarte de actualizarla siempre
`}</Codigo>

            <Demo><BuscadorAlumnos /></Demo>
            <Codigo>{`
const visibles = alumnos.filter(a => a.nombre.toLowerCase().includes(busqueda.toLowerCase()))
const media = visibles.reduce((suma, a) => suma + a.nota, 0) / visibles.length
const mejor = alumnos.find(a => a.nota >= 9)
`}</Codigo>

            <Nota tipo="truco" titulo="for vs. reduce">
                Tu bucle <C>{'for (const prod of carrito) total += ...'}</C> está bien. <C>reduce</C> hace lo mismo en una línea:
                <C>{'const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0)'}</C>
            </Nota>

            <Ejercicio
                numero={6}
                enunciado={
                    <>
                        <p>Lista de libros con filtros. Copia este array en tu archivo:</p>
                        <Codigo>{`
type Libro = { id: number, titulo: string, precio: number, disponible: boolean }

const libros: Libro[] = [
    { id: 1, titulo: "Clean Code", precio: 35, disponible: true },
    { id: 2, titulo: "El Quijote", precio: 12, disponible: false },
    { id: 3, titulo: "Aprendiendo React", precio: 28, disponible: true },
    { id: 4, titulo: "JavaScript: The Good Parts", precio: 22, disponible: true },
    { id: 5, titulo: "Cien años de soledad", precio: 15, disponible: false },
]
`}</Codigo>
                        <ul>
                            <li>Pinta los libros en una lista con su precio y "(agotado)" si no están disponibles.</li>
                            <li>Un input para buscar por título (sin distinguir mayúsculas).</li>
                            <li>Un checkbox "Solo disponibles".</li>
                            <li>Debajo: "Mostrando X de 5 · Total: Y €" (total de los visibles).</li>
                            <li>Si no queda ninguno, "No hay libros".</li>
                            <li>Extra: un checkbox "Ordenar por precio" (ojo: <C>sort</C> sí modifica el array original).</li>
                        </ul>
                    </>
                }
                pistas={[
                    "Solo necesitas estado para lo que escribe/marca el usuario. La lista visible se calcula.",
                    "Puedes encadenar: libros.filter(...).filter(...)",
                    "Filtro de disponibles: .filter(l => !soloDisponibles || l.disponible)",
                    "Para ordenar sin romper el original: [...visibles].sort((a, b) => a.precio - b.precio)",
                ]}
                solucion={solucion}
            >
                <Ejercicio6 />
            </Ejercicio>
        </article>
    )
}

export default L6Listas
