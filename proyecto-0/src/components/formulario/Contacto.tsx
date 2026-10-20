import { useState } from "react"


function Contacto() {

    const [nombreTemp, setNombreTemp] = useState('')
    const [emailTemp, setEmailTemp] = useState('')
    const [saludo, setSaludo] = useState('')

    const enviar = () => {
        setSaludo(`${nombreTemp} (${emailTemp})`)

    }

    return (
        <>
        <label>Nombre</label><br></br>
        <input type="text" placeholder="Introduce tu nombre..." onChange={(e) => setNombreTemp(e.target.value)} value={nombreTemp}/>
        <br></br><label>Correo</label><br></br>
        <input type="text" placeholder="Introduce tu email..." onChange={(e) => setEmailTemp(e.target.value)} value={emailTemp}/>
        <button onClick={() => enviar()}>Enviar</button><br></br>

        {saludo}
        </>
    )
}

export default Contacto