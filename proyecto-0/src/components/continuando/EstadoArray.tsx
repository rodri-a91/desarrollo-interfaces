import { useState } from "react"

function EstadoArray() {
    const estados = ['1', '2', '3', '4', '5']

    const [estadoID, setEstado] = useState<number>(0)
    const cambiarEstado = () => {
        if (estadoID < estados.length - 1) {
            setEstado(estadoID + 1)
        }
        else {
            setEstado(0)
        }
    }

    return (
        <div>
            <h3>EstadosArray</h3>
            <p>Estado actual: {estados[estadoID]}</p>
            <button onClick={() => { cambiarEstado() }}>Cambiar estado</button>
        </div>
    )
}

export default EstadoArray