import { useState } from "react"

type Alumno = {
    id: number,
    nombre: string,
    nota: number
}

const alumnos: Alumno[] = [
    { id: 1, nombre: "Sofía Martínez", nota: 8.5 },
    { id: 2, nombre: "Alejandro Gómez", nota: 9.2 },
    { id: 3, nombre: "Lucía Fernández", nota: 6.8 },
    { id: 4, nombre: "Carlos Mendoza", nota: 4.2 },
    { id: 5, nombre: "Elena Torres", nota: 3.5 },
    { id: 6, nombre: "Pablo Ruiz", nota: 7.4 }
]



function ListaAlumnosFiltrados() {
    const [aprobados, setAprobados] = useState<boolean>(false)

    const listaVisible = aprobados ? alumnos.filter(a => a.nota >= 5) : alumnos
    return (
        <>
            <h4>Tabla de alumnos (aprobados)</h4>
            <label>
                <input type="checkbox" checked={aprobados} onChange={e => setAprobados(e.target.checked)}/> Sólo aprobados
            </label>
            <table border={5}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Nota</th>
                    </tr>

                </thead>
                <tbody>{listaVisible.map(a =>
                    <tr key={a.id}>
                        <td>{a.nombre}</td>
                        <td>{a.nota}</td>
                    </tr>
                )}
                </tbody>
            </table>
            {aprobados && <p>{listaVisible.length} alumnos aprobados de {alumnos.length}</p>}
        </>
    )
}

export default ListaAlumnosFiltrados