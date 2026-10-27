import { useEffect, useState } from "react"

function Llamado() {
    const [contador, setContador] = useState(0)
    const [likes, setLikes] = useState(0)

    //1. Montaje y desmontaje
    useEffect(() => {
        console.log('1: Montando')

        return () => {
            console.log('1: Desmontando')
        }
    })


    //2. En cada renderizado
    useEffect(() => console.log('2. Renderizando'))

    //3. Dependencia de un estado
    useEffect(() => {
        console.log('3: Montando')

        return () => {
            console.log('3: Desmontando')
        }
    }, [likes])

    return (
        <>
            <h3>Llamado</h3>
            <button onClick={() => setContador(contador + 1)}>+1</button>
            <button onClick={() => setLikes(likes + 1)}>+1 like</button>
            <p>Contador: {contador}</p>
            <p>Likes: {likes}</p>
        </>
    )
}

export default Llamado