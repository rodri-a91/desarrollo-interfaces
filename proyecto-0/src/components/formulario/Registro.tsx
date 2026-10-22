import { useState } from "react"

type Errores = {
    nombre?: string
    correo?: string
}

function validar(nombre: string, correo: string): Errores {
    const errores: Errores = {}
    if (nombre.trim() === "") errores.nombre = "Error el el nombre"
    if (!correo.includes("@")) errores.correo = "Error en el correo"

    return errores
}

function Registro() {
    const [nombre, setNombre] = useState<string>('')
    const [correo, setCorreo] = useState<string>('')
    const [registrado, setRegistrado] = useState<string>('')
    const [intentado, setIntentado] = useState<boolean>(false)

    const errores = validar(nombre, correo)
    const hayErrores = Object.keys(errores).length > 0

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault()
                setIntentado(true)
                if (hayErrores) return
                setRegistrado(`${nombre} (${correo})`)
                setNombre('')
                setCorreo('')
                setIntentado(false)
            }
            }>
                <label>Nombre</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)}/>
                {intentado && errores.nombre && <p>{errores.nombre}</p>}
                <br /><label>Correo</label>
                <input value={correo} onChange={e => setCorreo(e.target.value)}/>
                {intentado && errores.correo && <p>{errores.correo}</p>}
                <button type="submit">Registrar</button>
                {registrado && <p>Registrado: {registrado}</p>}
            </form>
        </>
    )
}

export default Registro