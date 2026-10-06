import { useState } from "react"

function EstadoClicks() {

    const [estado, setEstado] = useState<number>(0)
    const cambiarEstado = () => {
        setEstado(estado + 1)
    }
    return (
        <div>
            <h3>EstadoClikcs</h3>
            <button onClick={() => { cambiarEstado() }}>Clicks: {estado}</button>

        </div>
    )
}

export default EstadoClicks