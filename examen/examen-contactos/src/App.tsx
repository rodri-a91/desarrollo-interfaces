import { useEffect, useState, type FormEvent } from 'react'
import './App.css'
import ListaContactos from './components/ListaContactos'
import type { Contacto } from './components/types'
import { api } from './api'

function App() {
  const [contactos, setContactos] = useState<Contacto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nuevoContacto, setNuevoContacto] = useState('')


  function alternarFavorito(id: string) {
    setContactos(contactos.map(it => it.id === id ? { ...it, favorito: !it.favorito } : it))
  }

  useEffect(() => {
    async function cargar() {
      try {
        const { data } = await api.get<Contacto[]>('/contactos')
        setContactos(data)
      }
      catch {
        setError('No se han podido cargar los datos')
      } finally {
        setCargando(false)
      }
    }
    cargar()

  }, [])

  /**
   * Función para contar cuántos contactos favoritos tiene en la agenda
   * 
   * @param contactos - Lista de contactos (que obtenemos de la API)
   * @returns número de contactos favoritos (basado en el atributo 'favorito')
   */

  function contarFavoritos(contactos: Contacto[]) {
    return contactos.filter(c => c.favorito).length
  }

  async function añadirContacto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (nuevoContacto.trim() === '') return
    try {
      const { data } = await api.post<Contacto>('/contactos', {
        nombre: nuevoContacto,
        telefono: '',
        categoria: 'amigos',
        favorito: false
      })
      setContactos(prev => [...prev, data])
      setNuevoContacto('')

    } catch {
      setError('Error creando un nuevo contacto')
    }



  }



  return (
    <>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && <>
        <h1>Agenda de contactos</h1>
        <p>Favoritos: {contarFavoritos(contactos)}</p>
        <ListaContactos contactos={contactos} onToggle={alternarFavorito} />

        <form onSubmit={añadirContacto}>
          <input type='text' value={nuevoContacto} onChange={e => setNuevoContacto(e.target.value)} />
          <button type='submit'>Añadir</button>
        </form>


      </>}


    </>
  )
}

export default App
