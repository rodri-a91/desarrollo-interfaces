import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import FichaLibro from './FichaLibro'

describe('FichaLibro', () => {
    it('muestra el título como encabezado y una línea por género', () => {
        render(<FichaLibro titulo='Fray Perico y su Borrico'
            generos={['thriller', 'misterio', 'true crime']}
            prestado={true} />)

        expect(screen.getByRole('heading', { name: 'Fray Perico y su Borrico' })).toBeInTheDocument()
        expect(screen.getAllByRole('listitem')).toHaveLength(3)
    })

    it('no muestra ninguna lista si no hay géneros', () => {
        render(<FichaLibro titulo='Fray Perico y su Borrico'
            generos={[]}
            prestado={false} />)

        expect(screen.getByText('Sin géneros')).toBeInTheDocument()
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    })

    it('se puede reservar si el libro no está prestado', () => {
        render(<FichaLibro titulo='Fray Perico y su Borrico'
            generos={['thriller', 'misterio']}
            prestado={false} />)

        expect(screen.queryByText('Ahora mismo está prestado')).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Reservar' })).toBeEnabled()
    })

    it('muestra el botón de reservar desactivado y el mensaje informativo', () => {
        render(<FichaLibro titulo='Fray Perico y su Borrico'
            generos={['thriller', 'misterio']}
            prestado={true} />)

        expect(screen.getByRole('button', { name: 'Reservar' })).toBeDisabled()
        expect(screen.getByText('Ahora mismo está prestado')).toBeInTheDocument()
    })
})