import { useState, type ComponentType } from "react"
import "./tutorial.css"
import L1Jsx from "./lecciones/L1Jsx"
import L2Props from "./lecciones/L2Props"
import L3Estado from "./lecciones/L3Estado"
import L4Condicional from "./lecciones/L4Condicional"
import L5Formularios from "./lecciones/L5Formularios"
import L6Listas from "./lecciones/L6Listas"
import L7ArraysEstado from "./lecciones/L7ArraysEstado"
import L8ActualizarObjetos from "./lecciones/L8ActualizarObjetos"
import L9CarritoStock from "./lecciones/L9CarritoStock"

type Leccion = {
    id: number
    titulo: string
    Componente: ComponentType   // un componente guardado en una variable (¡también se puede!)
}

const lecciones: Leccion[] = [
    { id: 1, titulo: "JSX", Componente: L1Jsx },
    { id: 2, titulo: "Props", Componente: L2Props },
    { id: 3, titulo: "Estado", Componente: L3Estado },
    { id: 4, titulo: "Condicionales", Componente: L4Condicional },
    { id: 5, titulo: "Formularios", Componente: L5Formularios },
    { id: 6, titulo: "Listas", Componente: L6Listas },
    { id: 7, titulo: "Añadir y borrar", Componente: L7ArraysEstado },
    { id: 8, titulo: "Modificar objetos", Componente: L8ActualizarObjetos },
    { id: 9, titulo: "CarritoStock", Componente: L9CarritoStock },
]

// Este componente también es un ejercicio de lectura: usa estado, listas,
// condicionales y arrays inmutables. ¿Entiendes cada línea?
function Tutorial() {
    const [actual, setActual] = useState(0)                   // posición en el array
    const [completadas, setCompletadas] = useState<number[]>([]) // ids de lecciones hechas

    const leccion = lecciones[actual]
    const hecha = completadas.includes(leccion.id)

    const alternarCompletada = () => {
        setCompletadas(anteriores => anteriores.includes(leccion.id)
            ? anteriores.filter(id => id !== leccion.id)
            : [...anteriores, leccion.id])
    }

    const irA = (posicion: number) => {
        setActual(posicion)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="tutorial">
            <h1>Tutorial de React</h1>
            <p className="intro">
                De JSX a CarritoStock, poco a poco. En cada lección: lee la explicación, juega con el ejemplo
                en vivo y haz el ejercicio en su archivo de <code>src/components/tutorial/ejercicios/</code>.
                Lo verás funcionando en la propia lección cada vez que guardes.
                Progreso: {completadas.length} / {lecciones.length}
            </p>

            <nav className="indice">
                {lecciones.map((l, i) => (
                    <button key={l.id} onClick={() => irA(i)} className={i === actual ? 'activa' : ''}>
                        {completadas.includes(l.id) ? '✅' : l.id} {l.titulo}
                    </button>
                ))}
            </nav>

            <leccion.Componente />

            <div className="navegacion">
                <button onClick={() => irA(actual - 1)} disabled={actual === 0}>← Anterior</button>
                <label>
                    <input type="checkbox" checked={hecha} onChange={alternarCompletada} /> Lección completada
                </label>
                <button onClick={() => irA(actual + 1)} disabled={actual === lecciones.length - 1}>Siguiente →</button>
            </div>
        </div>
    )
}

export default Tutorial
