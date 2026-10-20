import { useState, type ChangeEvent } from "react"

type DatosProps = {
    name: string
    email: string
}


function ContactoUnico() {

    const [datos, setDatos] = useState<DatosProps>({name: '', email: ''})

    const [enviado, setEnviado] = useState('')

    const cambiar = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setDatos({...datos, [name]: value})

    }

    const enviar = () => {
        setEnviado(`${datos.name} (${datos.email})`)
    }

    return (
        <>
        <label>Nombre</label><br></br>
        <input type="text" placeholder="Introduce tu nombre..." onChange={cambiar} name="name" value={datos.name}/>
        <br></br><label>Correo</label><br></br>
        <input type="text" placeholder="Introduce tu email..." onChange={cambiar} name="email" value={datos.email}/>
        <button onClick={enviar}>Enviar</button><br></br>

        {enviado}
        </>
    )
}

export default ContactoUnico