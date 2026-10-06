import { useState } from "react"

function AlternarContenido() {
    const [claridad, setClaridad] = useState<boolean>(true)
  return (
    <div>
            <h3>AlternarContenido</h3>
            <p>El día está: {
                claridad ? "claro": "oscuro"}</p>

            <button onClick={() => {setClaridad(!claridad)}}>Cambiar claridad</button>
            <br/>
            <small>Fin de componentes MostrarOcultar</small>
        </div>
  )
}

export default AlternarContenido