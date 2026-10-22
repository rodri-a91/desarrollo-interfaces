import { useState } from "react"
import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio9 from "../ejercicios/Ejercicio9"

type Producto = { id: string, nombre: string, precio: number, cantidad: number }

const catalogoInicial: Producto[] = [
    { id: 'teclado', nombre: 'Teclado', precio: 45, cantidad: 2 },
    { id: 'raton', nombre: 'Ratón', precio: 20, cantidad: 3 },
]

// Tu CarritoStock, recortado, enseñando lo que hay en cada estado
function CarritoConRayosX() {
    const [catalogo, setCatalogo] = useState(catalogoInicial)
    const [carrito, setCarrito] = useState<Producto[]>([])

    const añadir = (producto: Producto) => {
        setCatalogo(ant => ant.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item))
        setCarrito(ant => {
            const existe = ant.find(item => item.id === producto.id)
            if (existe) {
                return ant.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
            }
            return [...ant, { ...producto, cantidad: 1 }]
        })
    }

    const quitarTodos = (producto: Producto) => {
        setCatalogo(ant => ant.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + producto.cantidad } : item))
        setCarrito(ant => ant.filter(item => item.id !== producto.id))
    }

    const verEstado = (lista: Producto[]) => lista.map(p => `{ ${p.id}, cantidad: ${p.cantidad} }`).join('\n') || '[]'

    return (
        <div>
            {catalogo.map(p => (
                <button key={p.id} onClick={() => añadir(p)} disabled={p.cantidad === 0}>+ {p.nombre}</button>
            ))}
            {carrito.map(p => (
                <button key={p.id} onClick={() => quitarTodos(p)}>Quitar todos los {p.nombre}</button>
            ))}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Codigo titulo="estado catalogo (cantidad = STOCK)">{verEstado(catalogo)}</Codigo>
                <Codigo titulo="estado carrito (cantidad = UNIDADES)">{verEstado(carrito)}</Codigo>
            </div>
        </div>
    )
}

const solucion = `
import { useState } from "react"

type Producto = {
    id: string
    nombre: string
    precio: number
    stock: number        // nunca cambia: es el stock total del almacén
}

type Linea = {
    id: string           // id del producto
    unidades: number     // cuántas hay en el carrito
}

// El catálogo NO es estado: no cambia nunca
const catalogo: Producto[] = [
    { id: crypto.randomUUID(), nombre: "Teclado mecánico", precio: 45, stock: 4 },
    { id: crypto.randomUUID(), nombre: "Ratón inalámbrico", precio: 20, stock: 2 },
    { id: crypto.randomUUID(), nombre: "Monitor 24\\"", precio: 120, stock: 10 },
    { id: crypto.randomUUID(), nombre: "Auriculares", precio: 35, stock: 4 },
]

function Ejercicio9() {
    // ÚNICA fuente de verdad
    const [lineas, setLineas] = useState<Linea[]>([])

    // --- Valores derivados ---
    const unidadesEnCarrito = (id: string) => lineas.find(l => l.id === id)?.unidades ?? 0
    const quedan = (p: Producto) => p.stock - unidadesEnCarrito(p.id)
    const buscar = (id: string) => catalogo.find(p => p.id === id)!

    const total = lineas.reduce((suma, l) => suma + buscar(l.id).precio * l.unidades, 0)
    const articulos = lineas.reduce((suma, l) => suma + l.unidades, 0)

    // --- Acciones: cada una toca UN solo estado ---
    const añadir = (id: string) => {
        setLineas(ant => ant.some(l => l.id === id)
            ? ant.map(l => l.id === id ? { ...l, unidades: l.unidades + 1 } : l)
            : [...ant, { id, unidades: 1 }])
    }

    const quitarUno = (id: string) => {
        setLineas(ant => ant
            .map(l => l.id === id ? { ...l, unidades: l.unidades - 1 } : l)
            .filter(l => l.unidades > 0))
    }

    const quitarTodos = (id: string) => {
        setLineas(ant => ant.filter(l => l.id !== id))
    }

    return (
        <>
            <h3>Catálogo</h3>
            <ul>
                {catalogo.map(p => (
                    <li key={p.id}>
                        {p.nombre} — {p.precio} € {quedan(p) > 0 ? \`(quedan \${quedan(p)})\` : 'Agotado'}{' '}
                        <button onClick={() => añadir(p.id)} disabled={quedan(p) === 0}>Añadir</button>
                    </li>
                ))}
            </ul>

            <h3>Carrito ({articulos} artículos)</h3>
            {lineas.length === 0 ? <p>El carrito está vacío</p> : (
                <>
                    <ul>
                        {lineas.map(l => {
                            const p = buscar(l.id)
                            return (
                                <li key={l.id}>
                                    {p.nombre} x {l.unidades} — {p.precio * l.unidades} €{' '}
                                    <button onClick={() => quitarUno(l.id)}>-1</button>
                                    <button onClick={() => añadir(l.id)} disabled={quedan(p) === 0}>+1</button>
                                    <button onClick={() => quitarTodos(l.id)}>Quitar</button>
                                </li>
                            )
                        })}
                    </ul>
                    <p>Total: {total} €</p>
                    <button onClick={() => setLineas([])}>Vaciar carrito</button>
                </>
            )}
        </>
    )
}

export default Ejercicio9
`

function L9CarritoStock() {
    return (
        <article className="leccion">
            <h2>9 · CarritoStock, paso a paso</h2>

            <p>
                Ya tienes todas las piezas. Vamos a leer tu <C>CarritoStock</C> con calma, ver por qué costó tanto
                y cómo diseñarlo para que sea mucho más fácil.
            </p>

            <h3>Lo que hace tu función añadir</h3>
            <Codigo titulo="CarritoStock.tsx · añadir">{`
function añadir(producto: Producto) {        // producto viene del CATÁLOGO
    // 1) Restar 1 al stock de ese producto en el catálogo   (patrón de la lección 8)
    setCatalogo(catalogoAnterior => catalogoAnterior.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item))

    // 2) Meterlo en el carrito
    setCarrito(carritoAnterior => {
        const existe = carritoAnterior.find(item => item.id === producto.id)

        if (existe) {   // 2a) ya estaba → +1 unidad          (lección 8)
            return carritoAnterior.map(item =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
        }
        // 2b) no estaba → lo añado con cantidad 1           (lección 7)
        return [...carritoAnterior, { ...producto, cantidad: 1 }]
        //                                         ↑ IMPRESCINDIBLE: producto.cantidad era el STOCK
    })
}
`}</Codigo>
            <p>
                Está bien hecho: usas la forma funcional, no mutas nada y cada caso es una de las técnicas que ya has visto.
                <C>quitarUno</C> es lo mismo al revés, y <C>quitarTodos</C> devuelve al stock <C>producto.cantidad</C>.
            </p>

            <h3>Por qué fue tan difícil</h3>
            <p>Pulsa los botones y mira cómo cambian los dos estados a la vez:</p>
            <Demo><CarritoConRayosX /></Demo>

            <Nota tipo="error" titulo="1 · La misma palabra significa dos cosas">
                <p>
                    En el catálogo <C>cantidad</C> es el <strong>stock</strong>; en el carrito son las <strong>unidades compradas</strong>.
                    Y los dos usan el mismo tipo <C>Producto</C>, así que TypeScript no te avisa si los confundes.
                </p>
                <p>
                    Por ejemplo, <C>quitarTodos(pr)</C> funciona solo porque <C>pr</C> viene del <C>carrito.map</C>. Si algún día le
                    pasas el producto del catálogo, devolverías al stock… el propio stock. 💥
                </p>
            </Nota>

            <Nota tipo="error" titulo="2 · Dos estados que hay que mantener sincronizados">
                <p>
                    Cada acción tiene que tocar <strong>dos</strong> estados y las cuentas tienen que cuadrar siempre:
                    stock + unidades en carrito = stock original. Si una de las dos actualizaciones tiene un fallo,
                    los números se descuadran y es difícil saber cuál falló.
                </p>
            </Nota>

            <Nota tipo="error" titulo="3 · Datos duplicados">
                <p>El nombre y el precio se copian en el carrito. Si cambiara el precio en el catálogo, el carrito tendría el antiguo.</p>
            </Nota>

            <h3>La solución: una única fuente de verdad</h3>
            <p>
                Pregúntate: <em>¿qué es lo mínimo que tengo que recordar?</em> El catálogo y el stock total no cambian.
                Lo único que cambia es <strong>cuántas unidades de cada producto hay en el carrito</strong>. Todo lo demás
                (lo que queda, los subtotales, el total) se puede <strong>calcular</strong>.
            </p>
            <Codigo titulo="Nuevo diseño">{`
type Producto = { id: string, nombre: string, precio: number, stock: number }
type Linea = { id: string, unidades: number }       // ← nombres distintos, tipos distintos

const catalogo: Producto[] = [...]                  // constante, NO estado
const [lineas, setLineas] = useState<Linea[]>([])   // ÚNICO estado

// Todo lo demás se deriva:
const unidadesEnCarrito = (id: string) => lineas.find(l => l.id === id)?.unidades ?? 0
const quedan = (p: Producto) => p.stock - unidadesEnCarrito(p.id)
`}</Codigo>
            <p>
                Ahora es <strong>imposible</strong> que el stock se descuadre: no se guarda, se calcula. Y cada acción
                solo toca un estado.
            </p>

            <Nota tipo="info" titulo={'¿Qué es "?? 0"?'}>
                <C>??</C> da un valor por defecto cuando lo de la izquierda es <C>null</C> o <C>undefined</C>.
                Si el producto no está en el carrito, <C>find</C> devuelve <C>undefined</C>, <C>?.unidades</C> también, y <C>?? 0</C> lo convierte en 0.
            </Nota>

            <Nota tipo="truco" titulo="Checklist para cualquier componente con estado">
                <p>1. ¿Qué datos cambian? → solo eso es estado.</p>
                <p>2. ¿Esto se puede calcular a partir de otra cosa? → entonces no es estado, es una constante en el render.</p>
                <p>3. ¿El nuevo valor depende del anterior? → <C>{'setX(anterior => ...)'}</C>.</p>
                <p>4. ¿Estoy cambiando un array u objeto? → nunca lo mutes: <C>...</C>, <C>map</C>, <C>filter</C>.</p>
                <p>5. ¿Dos cosas distintas se llaman igual? → cámbiales el nombre.</p>
            </Nota>

            <Ejercicio
                numero={9}
                enunciado={
                    <>
                        <p>
                            <strong>Rehaz CarritoStock</strong> con el nuevo diseño. Usa los mismos 4 productos de tu
                            CarritoStock, pero con <C>stock</C> en lugar de <C>cantidad</C>.
                        </p>
                        <ul>
                            <li>El catálogo es una constante. El único estado es <C>lineas: Linea[]</C>.</li>
                            <li>Catálogo: nombre, precio, "(quedan N)" o "Agotado", y botón Añadir (desactivado si no quedan).</li>
                            <li>Carrito: nombre x unidades — subtotal, con botones <strong>-1</strong>, <strong>+1</strong> y <strong>Quitar</strong>.</li>
                            <li>Si una línea llega a 0 unidades, desaparece.</li>
                            <li>Total en euros, número de artículos en el título ("Carrito (3 artículos)") y botón "Vaciar carrito".</li>
                            <li>"El carrito está vacío" cuando no haya nada.</li>
                        </ul>
                        <p>Cuando funcione, compara tu código con el <C>CarritoStock.tsx</C> original: debería ser bastante más corto.</p>
                    </>
                }
                pistas={[
                    "Empieza solo por el catálogo con quedan(p), sin carrito. Luego añade añadir(), luego la lista del carrito, luego el resto.",
                    "añadir(id): si ya hay una línea con ese id → map con unidades + 1; si no → [...ant, { id, unidades: 1 }]",
                    "quitarUno(id): primero map restando 1 y luego .filter(l => l.unidades > 0). Así no necesitas el if.",
                    "Para pintar una línea necesitas el producto: const p = catalogo.find(p => p.id === l.id)! (el ! le dice a TS que seguro existe).",
                    "total = lineas.reduce((suma, l) => suma + precioDe(l.id) * l.unidades, 0)",
                ]}
                solucion={solucion}
            >
                <Ejercicio9 />
            </Ejercicio>
        </article>
    )
}

export default L9CarritoStock
