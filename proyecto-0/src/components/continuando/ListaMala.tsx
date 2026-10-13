const modulos: string[] = ['Desarrollo de interfaces', 'Acceso a datos', 'Programación']

function ListaMala() {
    return (
        <>
            <h4>Módulos de 2º DAM (mal mostrados)</h4>
            <ul>
                {
                    modulos.map((m) => { return <li>{m}</li> })
                }
            </ul>


        </>
    )
}

export default ListaMala

