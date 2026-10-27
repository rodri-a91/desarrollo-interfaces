import { useEffect, useState } from "react"

function Buscador() {
    const [tecleado, setTecleado] = useState('')
    const [buscado, setBuscado] = useState('')

    useEffect(() => {
        const id = setTimeout(() => {
            setBuscado(tecleado)

        }, 500);

        // Si el texto cambia en menos de 500ms...
        return () => {
            clearTimeout(id)
        }
    }, [tecleado])


    return (
        <>
            <h3>Buscador</h3>
            <input type="text" value={tecleado} onChange={(e) => setTecleado(e.target.value)} />
            <p>Tecleado: {tecleado}</p>
            <p>A buscar: {buscado}</p>
        </>
    )
}

export default Buscador