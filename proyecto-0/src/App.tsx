import './App.css'
import InfoPersonal from './components/InfoPersonal'
import MisHobbies from './components/MisHobbies'
import Saludo from './components/Saludo'
import SaludoConDatos from './components/SaludoConDatos'

function App() {
  return (
    <div className="container">
      <h1>¡Hola Mundo!</h1>
      <p>Esta es mi primera aplicación React con TypeScript</p>

      <Saludo />
      <SaludoConDatos nombre="María" edad={25} />


      <br></br>
      <br></br>
      <br></br>
      <h1>Mi página personal</h1>
      <InfoPersonal ciudad='adis abeba' descripcion='dnsaodunsadasda' edad={65} nombre='pepe' />
      <MisHobbies hobbie1='Natación' hobbie2='Cazar' hobbie3='Parapente' />
    </div>
  )
}

export default App