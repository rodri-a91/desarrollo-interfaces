import type { ReactNode } from "react"
import { C, Codigo, Demo, Ejercicio, Nota } from "../piezas"
import Ejercicio2 from "../ejercicios/Ejercicio2"

type EtiquetaProps = {
    texto: string
    color?: 'gris' | 'verde' | 'rojo'
}

const colores = { gris: '#71717a', verde: '#16a34a', rojo: '#dc2626' }

function Etiqueta({ texto, color = 'gris' }: EtiquetaProps) {
    return (
        <span style={{ background: colores[color], color: 'white', padding: '2px 8px', borderRadius: 12, marginRight: 6 }}>
            {texto}
        </span>
    )
}

function Caja({ titulo, children }: { titulo: string, children: ReactNode }) {
    return (
        <section style={{ border: '1px solid gray', borderRadius: 8, padding: '0 1rem 1rem', marginTop: 8 }}>
            <h4>{titulo}</h4>
            {children}
        </section>
    )
}

const solucion = `
import type { ReactNode } from "react"

type InsigniaProps = {
    texto: string
    nivel?: 'bronce' | 'plata' | 'oro'
}

const medallas = { bronce: '🥉', plata: '🥈', oro: '🥇' }

function Insignia({ texto, nivel = 'bronce' }: InsigniaProps) {
    return <p>{medallas[nivel]} {texto} ({nivel})</p>
}

type PanelProps = {
    titulo: string
    children: ReactNode
}

function Panel({ titulo, children }: PanelProps) {
    return (
        <section>
            <h3>{titulo}</h3>
            {children}
        </section>
    )
}

function Ejercicio2() {
    return (
        <Panel titulo="Mis logros">
            <Insignia texto="Primer componente" />
            <Insignia texto="Props dominadas" nivel="plata" />
            <Insignia texto="Carrito terminado" nivel="oro" />
        </Panel>
    )
}

export default Ejercicio2
`

function L2Props() {
    return (
        <article className="leccion">
            <h2>2 · Props, tipos y children</h2>

            <p>
                Las <strong>props</strong> son los "parámetros" de un componente. Permiten reutilizar el mismo
                componente con datos distintos, como hiciste con <C>{'<Producto nombre="Camiseta" precio={100} disponible />'}</C>.
            </p>

            <Codigo titulo="Props con TypeScript">{`
type BotonProps = {
    texto: string                          // obligatoria
    variante?: 'primario' | 'secundario'   // opcional (?) y solo admite esos 2 valores
    grande?: boolean
}

// Desestructuramos las props y damos valores por defecto con =
function Boton({ texto, variante = 'primario', grande = false }: BotonProps) {
    return <button className={\`boton \${variante} \${grande ? 'grande' : ''}\`}>{texto}</button>
}

// Uso:
<Boton texto="Aceptar" />
<Boton texto="Cancelar" variante="secundario" grande />   // "grande" solo = grande={true}
`}</Codigo>

            <Nota tipo="info" titulo="Strings vs. resto de valores">
                <p>Los strings van entre comillas: <C>{'nombre="Ana"'}</C>.</p>
                <p>Todo lo demás va entre llaves: <C>{'precio={9.95}'}</C>, <C>{'disponible={false}'}</C>, <C>{'formatear={enDolares}'}</C>.</p>
            </Nota>

            <h3>children: lo que va "dentro" del componente</h3>
            <p>
                Cuando escribes contenido entre la etiqueta de apertura y la de cierre, llega en la prop
                especial <C>children</C>, de tipo <C>ReactNode</C>. Así funcionaban tus <C>Tarjeta</C> y <C>Catalogo</C>.
            </p>
            <Demo>
                <Caja titulo="Estado de mis módulos">
                    <Etiqueta texto="Interfaces" color="verde" />
                    <Etiqueta texto="Acceso a datos" />
                    <Etiqueta texto="Inglés" color="rojo" />
                </Caja>
            </Demo>
            <Codigo>{`
function Caja({ titulo, children }: { titulo: string, children: ReactNode }) {
    return (
        <section>
            <h4>{titulo}</h4>
            {children}      {/* aquí aparecen las Etiquetas */}
        </section>
    )
}

<Caja titulo="Estado de mis módulos">
    <Etiqueta texto="Interfaces" color="verde" />
    <Etiqueta texto="Acceso a datos" />
</Caja>
`}</Codigo>

            <h3>Funciones como props</h3>
            <p>
                Una prop puede ser una función. En tu <C>Precio</C> pasabas <C>formatear</C> para decidir cómo se ve la cantidad.
                Esto es la base de los eventos (<C>onClick</C> es una prop que recibe una función).
            </p>

            <Nota tipo="truco" titulo="Objetos como diccionario">
                Para traducir un valor a otro (nivel → icono) en vez de muchos <C>if</C> usa un objeto:
                <C>{"const iconos = { info: 'ℹ️', error: '⛔' }"}</C> y luego <C>{'iconos[tipo]'}</C>.
                Lo hiciste en <C>Aviso</C> y en <C>SelectorActividades</C> con <C>Record</C>.
            </Nota>

            <Ejercicio
                numero={2}
                enunciado={
                    <>
                        <p>En el mismo archivo crea dos componentes y úsalos desde <C>Ejercicio2</C>:</p>
                        <ul>
                            <li><C>Insignia</C>: props <C>texto</C> (obligatoria) y <C>nivel</C> opcional que solo puede ser <C>'bronce' | 'plata' | 'oro'</C>, con <C>'bronce'</C> por defecto. Muestra 🥉 🥈 o 🥇 según el nivel.</li>
                            <li><C>Panel</C>: props <C>titulo</C> y <C>children</C>. Pinta el título y debajo los hijos.</li>
                            <li><C>Ejercicio2</C> devuelve un <C>Panel</C> "Mis logros" con tres insignias, una de cada nivel (una sin pasar <C>nivel</C>).</li>
                        </ul>
                    </>
                }
                pistas={[
                    "Define el tipo con type InsigniaProps = { texto: string, nivel?: 'bronce' | 'plata' | 'oro' }.",
                    "El valor por defecto va en la desestructuración: function Insignia({ texto, nivel = 'bronce' }: InsigniaProps)",
                    "Para el icono: const medallas = { bronce: '🥉', plata: '🥈', oro: '🥇' } y luego {medallas[nivel]}.",
                    "children necesita: import type { ReactNode } from \"react\"",
                ]}
                solucion={solucion}
            >
                <Ejercicio2 />
            </Ejercicio>
        </article>
    )
}

export default L2Props
