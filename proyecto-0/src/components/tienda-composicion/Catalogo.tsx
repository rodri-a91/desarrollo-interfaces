import type { ReactNode } from "react"

type CatalogoProps = {
    titulo: string
    children: ReactNode
}
function Catalogo({titulo, children}: CatalogoProps) {
  return (
    <>
    <h2>{titulo}</h2>
    <div className="productos">{children}</div>
    </>
  )
}

export default Catalogo