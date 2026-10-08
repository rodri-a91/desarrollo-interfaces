import { useState } from "react"

function SelectorActividades() {
    const [nombre, setNombre] = useState<string>('')
    const [nombreTemporal, setNombreTemporal] = useState<string>('')
    const [actividad, setActividad] = useState<string>('')
    const [energia, setEnergia] = useState<string>('bajo')
    const [tiempo, setTiempo] = useState<number>(15)

    const [visible, setVisible] = useState<boolean>(false)


    const resetear = () => {
        setNombre('')
        setNombreTemporal('')
    }

    const mostrarRecomendaciones = () => {
        setVisible(!visible)
    }

    const recomendaciones: Record<string, string[]> = {
        deporte: ['Recuerda hidratarte', 'Haz calentamiento'],
        lectura: ['Busca un lugar cómodo', 'Ajusta la luz'],
        música: ['Usa auriculares', 'Prueba géneros nuevos'],
        cocina: ['Lee la receta completa', 'Ten los ingredientes listos'],
    }

    return (
        <div>
            <h3>Selector de actividades</h3>
            <p>Nombre: <input onChange={(e) => setNombreTemporal(e.target.value)} value={nombreTemporal} type="text" placeholder="Tu nombre..." /><button onClick={() => setNombre(nombreTemporal)}>Guardar</button><button onClick={() => resetear()}>Reset</button></p>
            <p>¿Qué quieres hacer?</p>
            <button onClick={() => setActividad('deporte')}>Deporte</button> <button onClick={() => setActividad('lectura')}>Lectura</button> <button onClick={() => setActividad('música')}>Música</button> <button onClick={() => setActividad('cocina')}>Cocina</button> <button onClick={() => setActividad('')}>Reset</button>

            {actividad && <div>
                <p>Selecciona el nivel de energía de tu actividad</p>
                <button onClick={() => setEnergia('alto')}>Alto</button> <button onClick={() => setEnergia('medio')}>Medio</button> <button onClick={() => setEnergia('bajo')}>Bajo</button>
                <p>Nivel energía seleccionado: {energia}</p>
                <h3>Tiempo disponible {tiempo} minutos</h3>
                <p><input type="range" min={15} max={180} step={15} value={tiempo} onChange={(e) => setTiempo(Number(e.target.value))} /></p></div>}

            <br/><button onClick={() => mostrarRecomendaciones()}>{visible ? "Ocultar recomendaciones" : "Mostrar recomendaciones"}</button>

            {visible && recomendaciones[actividad] &&  <ul>
                <li>{recomendaciones[actividad][0]}</li>
                <li>{recomendaciones[actividad][1]}</li>
                </ul>}

            <p>Hola {nombre} {actividad ? "tu actividad recomendada es" : "no tienes actividad recomendada"} {actividad} durante {tiempo} minutos al día
                con nivel de energía {energia}
            </p>
        </div>
    )
}

export default SelectorActividades