import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Libro from './Libro'

describe('Libro', () => {
    it('muestra el encabezado correctamente', () => {
        render(<Libro autor='Cervantes' ejemplares={2} titulo='Quijote' />)

        expect(screen.getByRole('heading', { name: 'Quijote' })).toBeInTheDocument()
        expect(screen.getByText('de Cervantes')).toBeInTheDocument()

    })

    it('muestra la cantidad correcta', () => {
        render(<Libro autor='Cervantes' ejemplares={5} titulo='Quijote' />)

        expect(screen.getByText('Disponible (5)')).toBeInTheDocument()
    })

    it('muestra que sólo queda un ejemplar', () => {
        render(<Libro autor='Cervantes' ejemplares={1} titulo='Quijote' />)

        expect(screen.getByText('Último ejemplar')).toBeInTheDocument()
        expect(screen.queryByText(/Disponible/)).not.toBeInTheDocument()
    })

    it('muestra que no quedan ejemplares', () => {
        render(<Libro autor='Cervantes' ejemplares={0} titulo='Quijote' />)

        expect(screen.getByText('No disponible')).toBeInTheDocument()
    })
})