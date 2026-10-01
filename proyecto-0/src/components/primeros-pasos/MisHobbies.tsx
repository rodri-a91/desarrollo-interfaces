type HobbiesProps = {
    hobbie1: string
    hobbie2: string
    hobbie3: string
}

function MisHobbies({hobbie1, hobbie2, hobbie3}: HobbiesProps) {
    return (
        <>
        <h2>Mis hobbies:</h2>
        <ul>
            <li>{hobbie1}</li>
            <li>{hobbie2}</li>
            <li>{hobbie3}</li>
        </ul>


        </>
    )

}

export default MisHobbies