import ContactoItem from "./ContactoItem"
import type { Contacto } from "./types"

type ListaContactosProps = {
    contactos: Contacto[],
    onToggle: (id: string) => void
}


function ListaContactos({ contactos, onToggle }: ListaContactosProps) {
    return (
        <ul>
            {contactos.map(it => (
                <ContactoItem key={it.id} favorito={it.favorito}
                    nombre={it.nombre} telefono={it.telefono} categoria={it.categoria}
                    onToggle={() => onToggle(it.id)} />
            ))}
        </ul>
    )
}

export default ListaContactos