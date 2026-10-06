import { useState } from "react"

function EstadoUsuario() {
    const [estado, setEstado] = useState<string>('🔴')
    const cambiarEstado = () => {
        if (estado === '🟡') { setEstado('🔴') }
        else if (estado === '🔴') { setEstado('🟢') }
        else { setEstado('🟡') }
    }
    return (
        <div>
            <h3>EstadoUsuario</h3>
            <p>El 🚦 está {estado}</p>

            <button onClick={() => { cambiarEstado() }}>Cambiar estado</button>
            <br />
            <small>Fin de componentes EstadoUsuario</small>
        </div>

    )
}

export default EstadoUsuario