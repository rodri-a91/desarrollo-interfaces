import { useState } from "react"

function MostrarOcultar() {
    const [visible, setVisible] = useState<boolean>(true)
    return (
        <div>
            <h3>Mostrar y ocultar</h3>
            {visible && (<p>Este párrafo ahora es visible</p>)}
            {/* {!visible && (<p>Este párrafo ahora NO es visible</p>)} */}
            <button onClick={() => {setVisible(!visible)}}>Cambiar visibilidad</button>
            <br></br>
            <small>Fin de componentes MostrarOcultar</small>
        </div>
    )
}

export default MostrarOcultar