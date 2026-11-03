import { useState, type ReactNode } from "react"

// Piezas reutilizables con las que están construidas todas las lecciones.
// Fíjate en que usan exactamente lo que estás aprendiendo: props, children y useState.

// Código "en línea" dentro de un párrafo. Usa siempre un string: <C>{'setX(x => x + 1)'}</C>
export function C({ children }: { children: string }) {
    return <code className="c">{children}</code>
}

type CodigoProps = {
    children: string
    titulo?: string
}

// Bloque de código de varias líneas
export function Codigo({ children, titulo }: CodigoProps) {
    return (
        <figure className="codigo">
            {titulo && <figcaption>{titulo}</figcaption>}
            <pre><code>{children.trim()}</code></pre>
        </figure>
    )
}

type NotaProps = {
    tipo?: 'info' | 'truco' | 'error'
    titulo?: string
    children: ReactNode
}

const iconos = { info: 'ℹ️', truco: '💡', error: '🐞' }

// Recuadro de aviso (igual que tu componente Aviso de primeros-pasos)
export function Nota({ tipo = 'info', titulo, children }: NotaProps) {
    return (
        <div className={`nota ${tipo}`}>
            {titulo && <strong>{iconos[tipo]} {titulo}</strong>}
            <div>{children}</div>
        </div>
    )
}

// Caja donde se muestra un ejemplo que funciona de verdad
export function Demo({ children }: { children: ReactNode }) {
    return (
        <div className="demo">
            <span className="etiqueta">Ejemplo en vivo</span>
            {children}
        </div>
    )
}

type EjercicioProps = {
    numero: number
    enunciado: ReactNode
    pistas: string[]
    solucion: string
    children: ReactNode // aquí llega TU componente EjercicioN
}

export function Ejercicio({ numero, enunciado, pistas, solucion, children }: EjercicioProps) {
    const [pistasVisibles, setPistasVisibles] = useState(0)
    const [verSolucion, setVerSolucion] = useState(false)

    return (
        <section className="ejercicio">
            <h3>✏️ Ejercicio {numero}</h3>
            {enunciado}

            <div className="tu-solucion">
                <span className="etiqueta">
                    Tu solución · src/components/tutorial/ejercicios/Ejercicio{numero}.tsx
                </span>
                {children}
            </div>

            {pistasVisibles > 0 && (
                <ol className="pistas">
                    {pistas.slice(0, pistasVisibles).map((p, i) => <li key={i}>{p}</li>)}
                </ol>
            )}

            <div className="acciones">
                <button
                    onClick={() => setPistasVisibles(n => n + 1)}
                    disabled={pistasVisibles === pistas.length}
                >
                    {pistasVisibles === pistas.length
                        ? 'No hay más pistas'
                        : `Ver pista (${pistasVisibles + 1}/${pistas.length})`}
                </button>
                <button onClick={() => setVerSolucion(!verSolucion)}>
                    {verSolucion ? 'Ocultar solución' : 'Ver solución'}
                </button>
            </div>

            {verSolucion && (
                <>
                    <Nota tipo="truco">
                        Intenta no copiarla tal cual: compárala con la tuya y busca las diferencias.
                    </Nota>
                    <Codigo titulo={`Solución · Ejercicio${numero}.tsx`}>{solucion}</Codigo>
                </>
            )}
        </section>
    )
}
