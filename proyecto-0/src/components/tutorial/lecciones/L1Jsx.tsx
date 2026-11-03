import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio1 from "../ejercicios/Ejercicio1"

function TarjetaPresentacion() {
    const nombre = "Rodrigo"
    const edad = 20
    const modulos = 6
    return (
        <div>
            <h3>{nombre.toUpperCase()}</h3>
            <p>Tengo {edad} años, así que soy {edad >= 18 ? "mayor" : "menor"} de edad.</p>
            <p>Este curso tengo {modulos} módulos ({modulos * 4} horas a la semana aprox.).</p>
        </div>
    )
}

const solucion = `
function Ejercicio1() {
    const titulo = "El viaje de Chihiro"
    const anio = 2001
    const duracion = 125 // minutos

    const horas = Math.floor(duracion / 60)
    const minutos = duracion % 60

    return (
        <div>
            <h3>{titulo} ({anio})</h3>
            <p>Duración: {horas}h {minutos}min</p>
            <p>{anio < 2000 ? "🎞️ Clásico" : "🎬 Moderno"}</p>
        </div>
    )
}

export default Ejercicio1
`

function L1Jsx() {
    return (
        <article className="leccion">
            <h2>1 · Componentes y JSX</h2>

            <p>
                Un <strong>componente</strong> es una función de JavaScript que devuelve <strong>JSX</strong>,
                que es "HTML dentro de JavaScript". Todo lo que has hecho en el curso son componentes:
                <C>Saludo</C>, <C>Producto</C>, <C>CarritoStock</C>…
            </p>

            <Codigo titulo="La estructura de siempre">{`
function Saludo() {          // 1. Nombre con MAYÚSCULA
    return (                 // 2. Devuelve JSX
        <div>                // 3. Un ÚNICO elemento padre
            <h2>Hola</h2>
            <p>Mi primer componente</p>
        </div>
    )
}

export default Saludo        // 4. Se exporta para poder importarlo en App.tsx
`}</Codigo>

            <h3>Las llaves {'{ }'}: meter JavaScript dentro del JSX</h3>
            <p>
                Dentro de las llaves puedes poner cualquier <strong>expresión</strong> (algo que devuelve un valor):
                variables, operaciones, llamadas a funciones, el operador ternario…
            </p>
            <Demo><TarjetaPresentacion /></Demo>
            <Codigo>{`
const nombre = "Rodrigo"
const edad = 20

<h3>{nombre.toUpperCase()}</h3>
<p>Soy {edad >= 18 ? "mayor" : "menor"} de edad</p>
`}</Codigo>

            <Nota tipo="error" titulo="Errores típicos">
                <p>• Nombre en minúscula (<C>{'function saludo()'}</C>): React lo trata como etiqueta HTML y no lo pinta.</p>
                <p>• Devolver dos elementos sueltos: hay que envolverlos en un <C>{'<div>'}</C> o en un fragmento <C>{'<>...</>'}</C>.</p>
                <p>• Escribir <C>class</C> en vez de <C>className</C>.</p>
                <p>• Poner un <C>if</C> dentro de las llaves: no es una expresión. Usa el ternario <C>{'cond ? a : b'}</C>.</p>
            </Nota>

            <Nota tipo="truco" titulo="Fragmentos">
                <C>{'<> ... </>'}</C> agrupa elementos sin añadir un <C>{'<div>'}</C> extra al HTML.
                Lo has usado en casi todos tus componentes.
            </Nota>

            <Ejercicio
                numero={1}
                enunciado={
                    <>
                        <p>Crea una ficha de película <strong>sin props</strong> (los datos van en constantes dentro del componente):</p>
                        <ul>
                            <li>Constantes <C>titulo</C>, <C>anio</C> y <C>duracion</C> (en minutos, por ejemplo 125).</li>
                            <li>Muestra el título y el año en un <C>{'<h3>'}</C>.</li>
                            <li>Muestra la duración en formato <em>"2h 5min"</em> calculándola a partir de los minutos.</li>
                            <li>Muestra "🎞️ Clásico" si es anterior al 2000 y "🎬 Moderno" si no.</li>
                        </ul>
                    </>
                }
                pistas={[
                    "Las horas son la división entera: Math.floor(duracion / 60).",
                    "Los minutos que sobran son el resto: duracion % 60.",
                    "Para lo de clásico/moderno usa un ternario dentro de las llaves: {anio < 2000 ? ... : ...}",
                ]}
                solucion={solucion}
            >
                <Ejercicio1 />
            </Ejercicio>
        </article>
    )
}

export default L1Jsx
