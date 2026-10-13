import { useState } from "react"

type Articulo = {
    id: string,
    nombre: string
}

const articulosIniciales: Articulo[] = [
    { id: crypto.randomUUID(), nombre: "Leche" },
    { id: crypto.randomUUID(), nombre: "Huevos" },
    { id: crypto.randomUUID(), nombre: "Yogurt" }
]



function ListaCompra() {
    const [articulos, setArticulos] = useState<Articulo[]>(articulosIniciales)
    const [articulo, setArticulo] = useState('')
    return (
        <>
            <h3>Lista de la compra</h3>
            <label>
                <input type="text" placeholder="Introduzca un artículo..." onChange={e => setArticulo(e.target.value)} /> <button onClick={() =>
                    setArticulos([...articulos, { id: crypto.randomUUID(), nombre: articulo.trim() }])}>Añadir</button>

            </label>

            <ul>
                {articulos.map(a => <li key={a.id}>{a.nombre} <button onClick={() => setArticulos(articulos.filter(art => art.id !== a.id))}>✖</button></li>)}
            </ul>
        </>
    )
}

export default ListaCompra