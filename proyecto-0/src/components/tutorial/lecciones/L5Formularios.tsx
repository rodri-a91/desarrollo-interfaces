import { useState } from "react"
import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio5 from "../ejercicios/Ejercicio5"

function InputNoControlado() {
    const [texto, setTexto] = useState('')
    return (
        <p>
            No controlado: <input onChange={e => setTexto(e.target.value)} placeholder="escribe..." />
            <button onClick={() => setTexto('')}>Borrar</button> → "{texto}"
        </p>
    )
}

function InputControlado() {
    const [texto, setTexto] = useState('')
    const [horas, setHoras] = useState(2)
    return (
        <>
            <p>
                Controlado: <input value={texto} onChange={e => setTexto(e.target.value)} placeholder="escribe..." />
                <button onClick={() => setTexto('')}>Borrar</button> → "{texto}"
            </p>
            <p>
                <input type="range" min={0} max={8} value={horas} onChange={e => setHoras(Number(e.target.value))} />
                {' '}{horas} h de estudio → {horas * 60} minutos
            </p>
        </>
    )
}

const solucion = `
import { useState } from "react"

function Ejercicio5() {
    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState(18)
    const [curso, setCurso] = useState('1º DAM')
    const [acepto, setAcepto] = useState(false)
    const [inscrito, setInscrito] = useState('')

    const valido = nombre.trim() !== '' && acepto

    const inscribirse = () => {
        setInscrito(\`\${nombre.trim()} (\${edad} años) inscrito en \${curso}\`)
        setNombre('')
        setEdad(18)
        setCurso('1º DAM')
        setAcepto(false)
    }

    return (
        <div>
            <p>Nombre: <input value={nombre} onChange={e => setNombre(e.target.value)} /></p>
            <p>Edad: <input type="number" min={16} value={edad} onChange={e => setEdad(Number(e.target.value))} /></p>
            <p>
                Curso:{' '}
                <select value={curso} onChange={e => setCurso(e.target.value)}>
                    <option>1º DAM</option>
                    <option>2º DAM</option>
                </select>
            </p>
            <label>
                <input type="checkbox" checked={acepto} onChange={e => setAcepto(e.target.checked)} />
                Acepto las normas
            </label>
            <p><button onClick={inscribirse} disabled={!valido}>Inscribirse</button></p>

            {inscrito && <p>✅ {inscrito}</p>}
        </div>
    )
}

export default Ejercicio5
`

function L5Formularios() {
    return (
        <article className="leccion">
            <h2>5 · Formularios e inputs controlados</h2>

            <p>
                Un input es <strong>controlado</strong> cuando su valor lo decide el estado de React:
                le pones <C>value</C> (lo que se ve) y <C>onChange</C> (cómo se actualiza).
            </p>

            <Codigo>{`
const [texto, setTexto] = useState('')

<input value={texto} onChange={e => setTexto(e.target.value)} />
//     ↑ el input muestra el estado      ↑ cada tecla actualiza el estado
`}</Codigo>

            <h3>¿Qué pasa si no pongo value?</h3>
            <p>Escribe algo en los dos y pulsa "Borrar":</p>
            <Demo>
                <InputNoControlado />
                <InputControlado />
            </Demo>
            <p>
                En el primero el estado se borra pero el texto se queda en la caja, porque el input no "lee" el estado.
                Esto le pasa a tu <C>ListaCompra</C>: después de añadir un artículo el texto sigue escrito.
            </p>

            <h3>Cada tipo de input</h3>
            <Codigo>{`
// texto
<input value={nombre} onChange={e => setNombre(e.target.value)} />

// número o range: e.target.value SIEMPRE es un string → conviértelo
<input type="range" value={tiempo} onChange={e => setTiempo(Number(e.target.value))} />

// checkbox: se usa checked, no value
<input type="checkbox" checked={aprobados} onChange={e => setAprobados(e.target.checked)} />

// select
<select value={curso} onChange={e => setCurso(e.target.value)}>
    <option value="1">1º DAM</option>
    <option value="2">2º DAM</option>
</select>
`}</Codigo>

            <Nota tipo="error" titulo={'"5" + 1 = "51"'}>
                Si se te olvida <C>Number()</C>, el estado guarda un string y las sumas concatenan.
            </Nota>

            <h3>Valor temporal y valor guardado</h3>
            <p>
                En <C>SelectorActividades</C> usaste dos estados: <C>nombreTemporal</C> (lo que se escribe) y
                <C> nombre</C> (lo que se guarda al pulsar el botón). Es el patrón correcto cuando el resultado no debe
                cambiar con cada tecla, sino al confirmar.
            </p>

            <Nota tipo="truco" titulo="Validar antes de guardar">
                <p>Calcula una constante en el render y úsala para desactivar el botón:</p>
                <p><C>{"const valido = nombre.trim() !== ''"}</C> → <C>{'<button disabled={!valido}>'}</C></p>
                <p><C>trim()</C> quita los espacios del principio y del final, así "   " cuenta como vacío.</p>
            </Nota>

            <Ejercicio
                numero={5}
                enunciado={
                    <>
                        <p>Formulario de inscripción con <strong>todos los inputs controlados</strong>:</p>
                        <ul>
                            <li>Nombre (texto), edad (number, empieza en 18), curso (select: 1º DAM / 2º DAM) y un checkbox "Acepto las normas".</li>
                            <li>El botón "Inscribirse" está desactivado si el nombre está vacío (o son solo espacios) o no se ha marcado el checkbox.</li>
                            <li>Al inscribirse, muestra debajo "✅ Ana (18 años) inscrito en 2º DAM" y <strong>vacía el formulario</strong>.</li>
                        </ul>
                    </>
                }
                pistas={[
                    "Necesitas un useState por cada campo, más uno para el mensaje final.",
                    "Para la edad: onChange={e => setEdad(Number(e.target.value))}",
                    "El checkbox usa checked={acepto} y e.target.checked.",
                    "Vaciar el formulario solo funciona si cada input tiene value={...}.",
                ]}
                solucion={solucion}
            >
                <Ejercicio5 />
            </Ejercicio>
        </article>
    )
}

export default L5Formularios
