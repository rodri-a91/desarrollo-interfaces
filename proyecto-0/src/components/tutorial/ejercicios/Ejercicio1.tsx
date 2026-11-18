// EJERCICIO 1 · Ficha de película
// El enunciado completo está en el tutorial (lección 1).
//
// 1. Crea las constantes titulo, anio y duracion (en minutos) dentro del componente.
// 2. Calcula horas y minutos.
// 3. Devuelve el h3 con título y año, la duración y Clásico/Moderno.
//
// Cuando lo tengas, borra el <p> de abajo y devuelve tu JSX.
// Guarda el archivo y verás el resultado al momento en la lección.

function Ejercicio1() {
    const titulo: string = 'El señor de los anillos'
    const anio: number = 2002
    const duracion: number = 125

    return <p className="pendiente">
        <h4>{titulo} / {anio}</h4>
        {Math.floor(duracion/60)}h {duracion%60}min 
        {anio >=2000 ? "🎬 Moderno" : "🎞️ Clásico"}
        </p>
}

export default Ejercicio1
