import type { Categoria } from "./types"
import './ContactoItem.css'


type ContactoItemProps = {
    nombre: string,
    telefono: string,
    favorito: boolean,
    categoria?: Categoria,
    onToggle: () => void
}

function ContactoItem({ nombre, telefono, favorito, categoria = 'amigos', onToggle }: ContactoItemProps) {
    return (
        <li>
            <span className="nombre-contacto" onClick={onToggle}> {nombre} · {telefono} </span> ({categoria}) {favorito && '✔️ favorito'}
        </li>
    )
}

export default ContactoItem