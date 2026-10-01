type ProductoProps = {
    nombre: string
    precio: number
    disponible: boolean
}

function Producto({nombre,precio,disponible}:ProductoProps) {
    return (
        <div className="producto">
        
        <h3>{nombre}</h3>
        <p>{precio.toLocaleString("es-ES", {style: "currency", currency: "EUR"})}</p>
        <p>{disponible ? "En stock" : "Agotado"}</p>
        </div>
    )

}

export default Producto