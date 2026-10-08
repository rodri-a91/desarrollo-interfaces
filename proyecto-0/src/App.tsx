// import AlternarContenido from './components/continuando/AlternarContenido.tsx'
// import EjemploInput from './components/continuando/EjemploInput.tsx'
// import EjemploParámetros from './components/continuando/EjemploParámetros.tsx'
// import EstadoArray from './components/continuando/EstadoArray.tsx'
// import EstadoClicks from './components/continuando/EstadoClicks.tsx'
// import EstadoUsuario from './components/continuando/EstadoUsuario.tsx'
// import MiComponente from './components/continuando/MiComponente.tsx'
// import MostrarOcultar from './components/continuando/MostrarOcultar.tsx'
// import Texto from './components/eventos/texto.tsx'
// import Contador from './components/estados/Contador'
// import Contador3 from './components/estados/Contador3'
// import Producto from './components/primeros-pasos/Producto'
// import Cabecera from './components/tienda-composicion/Cabecera'
// import Catalogo from './components/tienda-composicion/Catalogo'
// import Pie from './components/tienda-composicion/Pie'
// import Boton from './components/Boton.tsx'
// import Precio from './components/Precio.tsx'
// import Tarjeta from './components/Tarjeta.tsx'

import SelectorActividades from "./components/SelectorActividades"

// const enDolares = (cantidad: number) => {
//   return cantidad.toLocaleString("us-US", { style: "currency", currency: "USD" })
// }


function App() {
    return (
    <>

<SelectorActividades/>


      {/* <MiComponente/>
      <MostrarOcultar/>
      <AlternarContenido/>
      <EstadoUsuario/>
      <EstadoArray/>
      <EstadoClicks/>
      <EjemploInput/>
      <EjemploParámetros/> */}





      {/* <Texto/> */}

      {/* <Contador titulo='+1' max={10}/>
      <Contador titulo='+5' step={5} max={10}/>
      <Contador titulo='+10' step={10} max={10}/>

      <Contador3 titulo='Sumar y restar'/> */}


      {/* <Cabecera titulo='Tienda del ciclo'/>
      <Catalogo titulo='Material'>
        <Producto disponible nombre='Cuaderno' precio={2.50}/>
        <Producto disponible={false} nombre='Auriculares' precio={24.90}/>
        <Producto disponible nombre='Memoria USB' precio={9.95}/>
      </Catalogo>
    <Pie/> */}



      {/* <Tarjeta titulo='Horario'>
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
      <Boton texto='Pulsa aquí' grande variante='secundario' /> */}
    </>
  )
}

export default App