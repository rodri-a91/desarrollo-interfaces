import { useState } from "react";

type Producto = {
    id: string,
    nombre: string,
    precio: number
}

const catalogo: Producto[] = [
    { id: crypto.randomUUID(), nombre: "Teclado mecánico", precio: 45 },
    { id: crypto.randomUUID(), nombre: "Ratón inalámbrico", precio: 20 },
    { id: crypto.randomUUID(), nombre: "Monitor 24\"", precio: 120 },
    { id: crypto.randomUUID(), nombre: "Auriculares", precio: 35 }
];


function Carrito() {
    const [carrito, setCarrito] = useState<Producto[]>([])
    let total = 0
    for (const prod of carrito) {
        total += prod.precio
    }
    return (
        <>
            <h3>Catálogo</h3>
            <ul>
                {catalogo.map(pr => (
                    <li key={pr.id}>
                        {pr.nombre} — {pr.precio} €

                        <button onClick={() => setCarrito([...carrito, pr])}>
                            Añadir
                        </button>
                    </li>
                ))}
            </ul>


            <h3>Carrito</h3>
            {carrito.length === 0 ? "El carrito está vacío" : <div>
                <ul>
                    {
                        carrito.map(pr => <li key={pr.id}>{pr.nombre} — {pr.precio} € <button onClick={() => setCarrito(carrito.filter((item) => pr.id !== item.id))}>✖</button></li>)
                    }
                </ul>

                <p>Total: {total} €</p>

            </div>}


        </>
    )
}

export default Carrito