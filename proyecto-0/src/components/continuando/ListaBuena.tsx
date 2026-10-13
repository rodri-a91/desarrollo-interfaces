type Modulo = {
    id: number,
    nombre: string
}

const modulos: Modulo[] = [{ id: 1, nombre: 'Desarrollo de interfaces' }, { id: 2, nombre: 'Acceso a datos' }, { id: 3, nombre: 'Programación' }]

function ListaBuena() {
    return (
        <>
            <h4>Módulos de 2º DAM (BIEN mostrados)</h4>
            <ul>
                {
                    modulos.map((m) => { return <li key={m.id}>{m.nombre}</li> })
                }
            </ul>


        </>
    )
}

export default ListaBuena