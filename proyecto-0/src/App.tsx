import './App.css'
import Boton from './components/Boton.tsx'
import Precio from './components/Precio.tsx'
import Producto from './components/Producto.tsx'
import Tarjeta from './components/Tarjeta.tsx'

const enDolares = (cantidad: number) => {
  return cantidad.toLocaleString("us-US", { style: "currency", currency: "USD" })
}

function App() {
  return (
    <div className="tienda">
      <Tarjeta titulo='Horario'>
        <p>De lunes a viernes, de 8:00 a 14:30.</p></Tarjeta>
      <Tarjeta titulo='Contacto'>
        <ul>
          <li>Secretaría: extensión 201</li>
          <li>Jefatura de estudios: extensión 204</li>
        </ul>
      </Tarjeta>
      <Precio cantidad={13.99} />
      <Precio cantidad={100.99} formatear={enDolares} />
      <Precio cantidad={54.15} formatear={(c) => Math.round(c) + ' €'} />
      <Producto nombre="Camiseta" precio={100} disponible />
      <Boton texto='Pulsa aquí' />
      <Producto nombre="Pantalón" precio={150.89} disponible={false} />
      <Boton texto='Pulsa aquí' grande variante='primario' />
      <Producto nombre="Sudadera" precio={155.99} disponible />
      <Boton texto='Pulsa aquí' grande variante='secundario' />
    </div>
  )
}

export default App