type ProductoProps = {
    nombre: string
    precio: number
    disponible: boolean
}

function Producto({nombre,precio,disponible}:ProductoProps) {
    return (
        <>
        
        <p>{nombre}</p>
        <p>{precio}</p>
        <p>{disponible}</p>

        </>
    )

}

export default Producto