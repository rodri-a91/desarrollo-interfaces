type InfoPersonalProps = {
    nombre: string
    edad: number
    ciudad: string
    descripcion: string
}

function InfoPersonal({nombre, edad, ciudad, descripcion}: InfoPersonalProps){
    return (
        <>
        <p>Me llamo {nombre}.</p>
        <p>Tengo {edad} años y vivo en {ciudad}.</p>
        <p>{descripcion}.</p>

        </>
    )
}

export default InfoPersonal