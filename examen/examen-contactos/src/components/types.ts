export type Categoria = 'familia' | 'trabajo' | 'amigos'

export type Contacto = {
    id: string,
    nombre: string,
    telefono: string,
    categoria: Categoria,
    favorito: boolean
}