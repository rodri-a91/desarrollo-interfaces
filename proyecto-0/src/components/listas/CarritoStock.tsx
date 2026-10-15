import { useState } from "react";

type Producto = {
    id: string,
    nombre: string,
    precio: number,
    cantidad: number
}


const catalogo_inicial: Producto[] = [
    { id: crypto.randomUUID(), nombre: "Teclado mecánico", precio: 45, cantidad: 4 },
    { id: crypto.randomUUID(), nombre: "Ratón inalámbrico", precio: 20, cantidad: 2 },
    { id: crypto.randomUUID(), nombre: "Monitor 24\"", precio: 120, cantidad: 10 },
    { id: crypto.randomUUID(), nombre: "Auriculares", precio: 35, cantidad: 4 }
]


function CarritoStock() {
    const [carrito, setCarrito] = useState<Producto[]>([])
    const [catalogo, setCatalogo] = useState(catalogo_inicial)
    let total = 0
    for (const prod of carrito) {
        total += prod.precio * prod.cantidad
    }
    function añadir(producto: Producto) {
        setCatalogo(catalogoAnterior => catalogoAnterior.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item))

        setCarrito(carritoAnterior => {
            const existe = carritoAnterior.find(item => item.id === producto.id)

            if (existe) {
                return carritoAnterior.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
            }

            return [...carritoAnterior, { ...producto, cantidad: 1 }]
        })

    }

    function quitarUno(producto: Producto) {
        setCatalogo(catalogoAnterior => catalogoAnterior.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item))



        setCarrito(carritoAnterior => {
            const prod = carritoAnterior.find(item => item.id === producto.id)

            if (prod?.cantidad === 1) {
                return carritoAnterior.filter((item) => prod.id !== item.id)
            }

            return carritoAnterior.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item)

        })

    }

    function quitarTodos(producto: Producto) {
        setCatalogo(catalogoAnterior => catalogoAnterior.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + producto.cantidad } : item))


        setCarrito(carritoAnterior => carritoAnterior.filter((item) => producto.id !== item.id))
    }

    return (
        <>
            <h3>Catálogo</h3>
            <ul>
                {
                    catalogo.map(pr => (
                        <li key={pr.id}>
                            {pr.nombre} — {pr.precio} € {pr.cantidad > 0 ? <span>(quedan {pr.cantidad})</span> : "Agotado"} <button onClick={() => añadir(pr)} disabled={pr.cantidad === 0}>
                                Añadir </button>


                        </li>
                    ))}
            </ul>


            <h3>Carrito</h3>
            {carrito.length === 0 ? "El carrito está vacío" : <div>
                <ul>
                    {
                        carrito.map(pr => <li key={pr.id}>{pr.nombre} x {pr.cantidad} — {pr.precio * pr.cantidad} € <button onClick={() => quitarUno(pr)}>Quitar uno</button> <button onClick={() => quitarTodos(pr)}>Quitar todos</button></li>)
                    }
                </ul>

                <p>Total: {total} €</p>

            </div>}


        </>
    )
}

export default CarritoStock