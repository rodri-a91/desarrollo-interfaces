import { useState } from "react"
import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio7 from "../ejercicios/Ejercicio7"

type Tarea = { id: string, texto: string }

function PushVsSpread() {
    const [tareas, setTareas] = useState<Tarea[]>([{ id: crypto.randomUUID(), texto: 'Repasar useState' }])

    const conPush = () => {
        // ❌ modifica el array del estado y le pasa a React EL MISMO array
        tareas.push({ id: crypto.randomUUID(), texto: 'Añadida con push' })
        setTareas(tareas)
    }

    const conSpread = () => {
        // ✅ crea un array NUEVO con lo que había + lo nuevo
        setTareas([...tareas, { id: crypto.randomUUID(), texto: 'Añadida con spread' }])
    }

    return (
        <div>
            <button onClick={conPush}>Añadir con push</button>
            <button onClick={conSpread}>Añadir con spread</button>
            <ul>{tareas.map(t => <li key={t.id}>{t.texto}</li>)}</ul>
            <small>Pulsa "push" varias veces (no pasa nada) y luego "spread": ¡aparecen de golpe!</small>
        </div>
    )
}

type Producto = { id: string, nombre: string }

const productos: Producto[] = [
    { id: 'p1', nombre: 'Teclado' },
    { id: 'p2', nombre: 'Ratón' },
]

function CarritoDuplicado() {
    const [carrito, setCarrito] = useState<Producto[]>([])
    return (
        <div>
            {productos.map(p => (
                <button key={p.id} onClick={() => setCarrito([...carrito, p])}>Añadir {p.nombre}</button>
            ))}
            <ul>
                {carrito.map(p => (
                    <li key={p.id}>
                        {p.nombre} <button onClick={() => setCarrito(carrito.filter(item => item.id !== p.id))}>✖</button>
                    </li>
                ))}
            </ul>
            <small>Añade dos teclados y borra uno: se van los dos (y la consola avisa de keys repetidas).</small>
        </div>
    )
}

const solucion = `
import { useState } from "react"

type Articulo = {
    id: string
    nombre: string
}

function Ejercicio7() {
    const [articulos, setArticulos] = useState<Articulo[]>([])
    const [texto, setTexto] = useState('')

    const nombre = texto.trim()
    const repetido = articulos.some(a => a.nombre.toLowerCase() === nombre.toLowerCase())
    const valido = nombre !== '' && !repetido

    const añadir = () => {
        if (!valido) return
        setArticulos([...articulos, { id: crypto.randomUUID(), nombre }])
        setTexto('')
    }

    const borrar = (id: string) => {
        setArticulos(articulos.filter(a => a.id !== id))
    }

    return (
        <div>
            <input
                value={texto}
                onChange={e => setTexto(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') añadir() }}
                placeholder="Introduce un artículo..."
            />
            <button onClick={añadir} disabled={!valido}>Añadir</button>
            {repetido && <p>⚠️ "{nombre}" ya está en la lista</p>}

            {articulos.length === 0 ? <p>La lista está vacía</p> : (
                <>
                    <ul>
                        {articulos.map(a => (
                            <li key={a.id}>{a.nombre} <button onClick={() => borrar(a.id)}>✖</button></li>
                        ))}
                    </ul>
                    <button onClick={() => setArticulos([])}>Vaciar lista</button>
                </>
            )}
        </div>
    )
}

export default Ejercicio7
`

function L7ArraysEstado() {
    return (
        <article className="leccion">
            <h2>7 · Arrays en el estado: añadir y eliminar</h2>

            <p>
                Regla de oro: <strong>el estado no se modifica, se sustituye</strong>. React compara el valor
                anterior con el nuevo; si le pasas el mismo array (aunque por dentro lo hayas cambiado), cree
                que no ha cambiado nada y no vuelve a pintar.
            </p>

            <Demo><PushVsSpread /></Demo>

            <Codigo titulo="Prohibido vs. correcto">{`
// ❌ MUTAN el array del estado          // ✅ crean un array NUEVO
lista.push(nuevo)                        [...lista, nuevo]           // añadir al final
lista.unshift(nuevo)                     [nuevo, ...lista]           // añadir al principio
lista.splice(i, 1)                       lista.filter(x => x.id !== id)  // eliminar
lista[i].cantidad++                      lista.map(...)              // modificar (lección 8)
lista.sort()                             [...lista].sort()           // ordenar
lista.length = 0                         []                          // vaciar
`}</Codigo>

            <Nota tipo="info" titulo="¿Qué hace ...?">
                El operador <strong>spread</strong> <C>...</C> "desparrama" los elementos: <C>[...[1, 2], 3]</C> es <C>[1, 2, 3]</C>.
                Con objetos igual: <C>{"{ ...alumno, nota: 10 }"}</C> copia todas las propiedades y cambia la nota.
            </Nota>

            <h3>Añadir con un id nuevo</h3>
            <Codigo>{`
const añadir = () => {
    setArticulos([...articulos, { id: crypto.randomUUID(), nombre: texto.trim() }])
    setTexto('')   // ← para que esto limpie la caja, el input necesita value={texto}
}

const borrar = (id: string) => {
    setArticulos(articulos.filter(a => a.id !== id))   // "quédate con todos MENOS ese"
}
`}</Codigo>

            <h3>El bug de tu primer Carrito</h3>
            <p>
                En <C>Carrito.tsx</C> añadías el producto tal cual: <C>{'setCarrito([...carrito, pr])'}</C>. Si añades
                el mismo producto dos veces, hay dos elementos con el <strong>mismo id</strong>:
            </p>
            <Demo><CarritoDuplicado /></Demo>
            <ul>
                <li>Las keys se repiten → React avisa y puede pintar mal la lista.</li>
                <li><C>{'filter(item => item.id !== p.id)'}</C> quita <strong>todos</strong> los que tienen ese id.</li>
            </ul>
            <p>
                Por eso en <C>CarritoStock</C> necesitaste una <C>cantidad</C>: en lugar de repetir el producto,
                cada producto aparece <strong>una sola vez</strong> y se cuenta cuántas unidades hay. Para eso hay que
                <strong> modificar</strong> un elemento del array, que es la lección siguiente.
            </p>

            <Ejercicio
                numero={7}
                enunciado={
                    <>
                        <p>Mejora tu <C>ListaCompra</C> arreglando sus fallos:</p>
                        <ul>
                            <li>Empieza vacía. El input debe ser <strong>controlado</strong> y vaciarse al añadir.</li>
                            <li>No se pueden añadir artículos vacíos o solo con espacios (botón desactivado).</li>
                            <li>No se pueden añadir repetidos, sin distinguir mayúsculas ("leche" = "Leche"). Muestra un aviso.</li>
                            <li>Se puede añadir pulsando <strong>Enter</strong> en el input.</li>
                            <li>Cada artículo tiene ✖ para borrarlo, y hay un botón "Vaciar lista".</li>
                            <li>Si está vacía muestra "La lista está vacía" (y no el botón de vaciar).</li>
                        </ul>
                    </>
                }
                pistas={[
                    "Estados: articulos (array) y texto (string). Todo lo demás se calcula.",
                    "¿Repetido? articulos.some(a => a.nombre.toLowerCase() === texto.trim().toLowerCase())",
                    "Enter: onKeyDown={e => { if (e.key === 'Enter') añadir() }}",
                    "Dentro de añadir() comprueba también si es válido, porque Enter no respeta el disabled del botón.",
                    "Vaciar es simplemente setArticulos([]).",
                ]}
                solucion={solucion}
            >
                <Ejercicio7 />
            </Ejercicio>
        </article>
    )
}

export default L7ArraysEstado
