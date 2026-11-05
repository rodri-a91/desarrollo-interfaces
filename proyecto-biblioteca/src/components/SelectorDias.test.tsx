import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectorDias from './SelectorDias'

describe('SelectorDias', () => {
    it('empieza en 7 días', () => {
        render(<SelectorDias />)

        expect(screen.getByText('Días: 7')).toBeInTheDocument()
    })

    it('el botón más suma un día y menos resta un día', async () => {
        const usuario = userEvent.setup()
        render(<SelectorDias />)
        await usuario.click(screen.getByRole('button', { name: 'Más días' }))
        expect(screen.getByText('Días: 8')).toBeInTheDocument()
        await usuario.click(screen.getByRole('button', { name: 'Menos días' }))
        expect(screen.getByText('Días: 7')).toBeInTheDocument()
        await usuario.click(screen.getByRole('button', { name: 'Menos días' }))
        expect(screen.getByText('Días: 6')).toBeInTheDocument()
    })

    it('no baja de 1 día y el botón se desactiva', async () => {
        const usuario = userEvent.setup()
        render(<SelectorDias />)
        const menos = (screen.getByRole('button', { name: 'Menos días' }))
        for (let i = 0; i < 6; i++) await usuario.click(menos)
        expect(screen.getByRole('button', { name: 'Menos días' })).toBeDisabled()
        expect(screen.getByText('Días: 1')).toBeInTheDocument()
    })

    it('no pasa del máximo y desactiva el botón de sumar', async () => {
        const usuario = userEvent.setup()
        render(<SelectorDias />)
        const mas = (screen.getByRole('button', { name: 'Más días' }))
        for (let i = 0; i < 7; i++) await usuario.click(mas)
        expect(screen.getByRole('button', { name: 'Más días' })).toBeDisabled()
        expect(screen.getByText(/Préstamo máximo/)).toBeInTheDocument()
    })
})