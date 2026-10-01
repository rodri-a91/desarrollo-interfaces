type CabaceraProps = {
    titulo: string
    lema?: string
}


function Cabecera({titulo, lema = 'Todo lo que necesitas para clase'}: CabaceraProps) {
  return (
    <header className="cabecera">
        <h1>{titulo}</h1>
        <p>{lema}</p>
    </header>
  )
}

export default Cabecera