import { useEffect, useState } from "react"

function Cronometro() {
    const [segundos, setSegundos] = useState(0)
    const [corriendo, setCorriendo] = useState(false)
    useEffect(() => {
        const id = setInterval(() => {
            if (!corriendo) return

            setSegundos(segundos => segundos + 1)

        }, 1000);

        return () => {
            clearInterval(id)
        }
    }, [corriendo])

    return (
        <>
            <h3>Cronómetro</h3>
            <p>Segundos: {segundos}</p>
            <button onClick={() => setCorriendo(!corriendo)}>{corriendo ? 'Pausar' : 'Continuar'}</button>

        </>
    )
}

export default Cronometro