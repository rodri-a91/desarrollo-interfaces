import { useState } from "react"
import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio4 from "../ejercicios/Ejercicio4"

type Pestana = 'perfil' | 'notas' | 'ajustes'

const contenidos: Record<Pestana, string> = {
    perfil: '👤 Rodrigo · 2º DAM',
    notas: '📝 Interfaces: 8 · Acceso a datos: 7',
    ajustes: '⚙️ Tema: según el sistema',
}

function Pestanas() {
    const [actual, setActual] = useState<Pestana>('perfil')
    const [detalles, setDetalles] = useState(false)
    const avisos: string[] = []

    return (
        <div>
            <button onClick={() => setActual('perfil')} disabled={actual === 'perfil'}>Perfil</button>
            <button onClick={() => setActual('notas')} disabled={actual === 'notas'}>Notas</button>
            <button onClick={() => setActual('ajustes')} disabled={actual === 'ajustes'}>Ajustes</button>

            <p>{contenidos[actual]}</p>

            <button onClick={() => setDetalles(!detalles)}>
                {detalles ? 'Ocultar' : 'Mostrar'} detalles
            </button>
            {detalles && <p>Estás viendo la pestaña "{actual}".</p>}

            <p>Avisos (mal): {avisos.length && 'tienes avisos'}</p>
            <p>Avisos (bien): {avisos.length > 0 ? 'tienes avisos' : 'sin avisos'}</p>
        </div>
    )
}

const solucion = `
import { useState } from "react"

type Color = 'rojo' | 'ambar' | 'verde'

const siguiente: Record<Color, Color> = { rojo: 'verde', verde: 'ambar', ambar: 'rojo' }
const emoji: Record<Color, string> = { rojo: '🔴', ambar: '🟡', verde: '🟢' }
const mensaje: Record<Color, string> = {
    rojo: 'Para',
    ambar: 'Precaución',
    verde: 'Puedes pasar',
}

function Ejercicio4() {
    const [color, setColor] = useState<Color>('rojo')
    const [ayuda, setAyuda] = useState(false)
    const [cambios, setCambios] = useState(0)

    const avanzar = () => {
        setColor(siguiente[color])
        setCambios(c => c + 1)
    }

    return (
        <div>
            <h3>{emoji[color]} {mensaje[color]}</h3>
            <button onClick={avanzar}>Siguiente</button>
            <button onClick={() => setAyuda(!ayuda)}>{ayuda ? 'Ocultar ayuda' : 'Ayuda'}</button>

            {ayuda && <p>El orden es rojo → verde → ámbar → rojo.</p>}
            {color === 'ambar' && <p>⚠️ ¡Va a ponerse rojo!</p>}
            <p>{cambios === 0 ? 'Aún no has cambiado el semáforo' : \`Cambios: \${cambios}\`}</p>
        </div>
    )
}

export default Ejercicio4
`

function L4Condicional() {
    return (
        <article className="leccion">
            <h2>4 · Renderizado condicional</h2>

            <p>
                Muchas veces queremos mostrar una cosa u otra según el estado: un mensaje de "carrito vacío",
                un botón que cambia de texto, un panel que se abre y se cierra…
            </p>

            <Codigo titulo="Las 3 formas">{`
// 1) Ternario: una cosa U otra
{visible ? <p>Visible</p> : <p>Oculto</p>}
{carrito.length === 0 ? "El carrito está vacío" : <ul>...</ul>}

// 2) &&: algo o NADA
{visible && <p>Solo aparece si visible es true</p>}

// 3) if antes del return (cuando cambia TODO el componente)
if (cargando) {
    return <p>Cargando...</p>
}
return <div>...contenido normal...</div>
`}</Codigo>

            <h3>Alternar un booleano</h3>
            <p>
                <C>{'setVisible(!visible)'}</C> invierte el valor. Es el patrón de tus <C>MostrarOcultar</C> y <C>AlternarContenido</C>.
            </p>

            <h3>Estado con varias opciones</h3>
            <p>
                Cuando hay más de dos posibilidades no uses varios booleanos: usa un <strong>string con un tipo
                de unión</strong> y un objeto para traducir cada opción (como hiciste con las actividades).
            </p>

            <Demo><Pestanas /></Demo>

            <Codigo>{`
type Pestana = 'perfil' | 'notas' | 'ajustes'

const contenidos: Record<Pestana, string> = {
    perfil: '👤 Rodrigo · 2º DAM',
    notas: '📝 Interfaces: 8 ...',
    ajustes: '⚙️ Tema: ...',
}

const [actual, setActual] = useState<Pestana>('perfil')

<button onClick={() => setActual('notas')} disabled={actual === 'notas'}>Notas</button>
<p>{contenidos[actual]}</p>
`}</Codigo>

            <Nota tipo="error" titulo="La trampa del 0 con &&">
                <p>
                    Mira la línea "Avisos (mal)" del ejemplo: aparece un <strong>0</strong>. Si la parte izquierda de
                    <C>{'&&'}</C> es el número 0, React pinta ese 0.
                </p>
                <p>
                    ❌ <C>{'{lista.length && <Lista />}'}</C> · ✅ <C>{'{lista.length > 0 && <Lista />}'}</C>
                </p>
            </Nota>

            <Nota tipo="truco" titulo="Lo que hiciste en SelectorActividades">
                <C>{'{visible && recomendaciones[actividad] && <ul>...</ul>}'}</C> encadena dos condiciones:
                si no hay actividad, <C>recomendaciones['']</C> es <C>undefined</C> y no se pinta nada. Bien pensado.
            </Nota>

            <Ejercicio
                numero={4}
                enunciado={
                    <>
                        <p>Haz un semáforo (parecido a tu <C>EstadoUsuario</C>, pero con tipos y objetos):</p>
                        <ul>
                            <li>Estado <C>color</C> de tipo <C>'rojo' | 'ambar' | 'verde'</C>, empieza en rojo.</li>
                            <li>Un botón "Siguiente" que pasa rojo → verde → ámbar → rojo… <strong>sin usar if</strong> (con un objeto).</li>
                            <li>Muestra el emoji y un mensaje: "Para", "Precaución", "Puedes pasar".</li>
                            <li>Un botón "Ayuda" que muestra/oculta un texto explicativo y cambia su propio texto.</li>
                            <li>Solo cuando esté en ámbar, muestra "⚠️ ¡Va a ponerse rojo!".</li>
                            <li>Extra: cuenta cuántas veces se ha cambiado y muestra "Aún no has cambiado el semáforo" si es 0.</li>
                        </ul>
                    </>
                }
                pistas={[
                    "type Color = 'rojo' | 'ambar' | 'verde' y useState<Color>('rojo').",
                    "Un objeto que dice cuál va después: const siguiente: Record<Color, Color> = { rojo: 'verde', verde: 'ambar', ambar: 'rojo' }",
                    "Así el botón queda: onClick={() => setColor(siguiente[color])}",
                    "Para el aviso de ámbar: {color === 'ambar' && <p>...</p>}",
                ]}
                solucion={solucion}
            >
                <Ejercicio4 />
            </Ejercicio>
        </article>
    )
}

export default L4Condicional
