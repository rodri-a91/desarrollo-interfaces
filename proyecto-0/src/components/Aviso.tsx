import type { ReactNode } from "react"

type TipoAviso = 'info' | 'exito' | 'error'

type AvisoProps = {
    tipo?: TipoAviso
    titulo?: string
    children: ReactNode
}

const iconos = {info: 'ℹ️', exito: '✅', error: '⛔'}


function Aviso({tipo = 'info', titulo = 'Aviso', children}: AvisoProps) {
  return (
    <div className={`aviso ${tipo}`}>
        <h2>{iconos[tipo]} {titulo} </h2>
        <p>{children}</p>
        </div>
  )
}

export default Aviso