// EJERCICIO 2 · Insignia y Panel
// El enunciado completo está en el tutorial (lección 2).
//
// 1. Encima de Ejercicio2 crea el type InsigniaProps y el componente Insignia.
// 2. Crea el type PanelProps (con children: ReactNode) y el componente Panel.
//    Necesitarás: import type { ReactNode } from "react"
// 3. Haz que Ejercicio2 devuelva un Panel con tres Insignias.
//
// Cuando lo tengas, borra el <p> de abajo y devuelve tu JSX.
// Guarda el archivo y verás el resultado al momento en la lección.

import type { ReactNode } from "react"

type InsigniaProps = {
    texto: string,
    nivel?: 'bronce' | 'plata' | 'oro'
}
const medallas = { bronce: '🥉', plata: '🥈', oro: '🥇' }

function Insignia({ texto, nivel = 'bronce' }: InsigniaProps) {
    return <p>{medallas[nivel]} {texto} {nivel}</p>
}
type PanelProps = {
    titulo: string,
    children: ReactNode
}
function Panel({ titulo, children }: PanelProps) {
    return <p>
        <h3>{titulo}</h3>
        {children}
    </p>

}



function Ejercicio2() {
    return <p className="pendiente">
        <Panel titulo="Mis logros">
            <Insignia texto="pepito"/>
            <Insignia texto="lourdes" nivel="plata"/>
            <Insignia texto="maria" nivel="oro"/>
        </Panel>
    </p>
}

export default Ejercicio2
