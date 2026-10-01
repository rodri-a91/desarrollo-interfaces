type PieProps = {
    texto?: string
}

function Pie({texto="Tienda del ciclo · Curso 2026/2027"}: PieProps) {
  return (
    <footer>{texto}</footer>
  )
}

export default Pie