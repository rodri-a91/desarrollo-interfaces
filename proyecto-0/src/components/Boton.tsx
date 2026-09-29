type BotonProps = {
    texto: string
    variante?: 'primario' | 'secundario'
    grande?: boolean
}

function Boton ({texto, variante, grande}: BotonProps) {
    const clases = `boton ${variante} ${grande ? 'grande' : ''}`
    return <button className={clases}>{texto}</button>;
}


export default Boton