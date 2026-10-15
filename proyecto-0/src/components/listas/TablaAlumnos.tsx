type Alumno = {
    id: number,
    nombre: string,
    nota: number
}

const alumnos: Alumno[] = [
    { id: 1, nombre: "Sofía Martínez", nota: 8.5 },
    { id: 2, nombre: "Alejandro Gómez", nota: 9.2 },
    { id: 3, nombre: "Lucía Fernández", nota: 6.8 }
]


function TablaAlumnos() {
    return (
        <>
            <h4>Lista de alumnos</h4>
            <ul>
                {
                    alumnos.map((a) => { return <li key={a.id}>Nombre: {a.nombre}<br />Nota: {a.nota}</li> })
                }

            </ul>

            <h4>Tabla de alumnos</h4>
            <table border={5}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Nota</th>
                    </tr>

                </thead>
                <tbody>{alumnos.map(a =>
                    <tr key={a.id}>
                        <td>{a.nombre}</td>
                        <td>{a.nota}</td>
                    </tr>
                )}
                </tbody>

            </table>

        </>
    )
}

export default TablaAlumnos