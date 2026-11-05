import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioReserva from './FormularioReserva'

describe('FormularioReserva', () => {
    it('envía correctamente los datos y borra correctamente los campos', async () => {
        const usuario = userEvent.setup()
        const onReservar = vi.fn()
        render(<FormularioReserva onReservar={onReservar} />)
        await usuario.type(screen.getByLabelText('Nombre del socio'), '  Marta')
        await usuario.type(screen.getByLabelText('Correo'), '  marta@marta.com')
        await usuario.click(screen.getByRole('button', { name: 'Reservar libro' }))

        expect(onReservar).toHaveBeenCalledTimes(1)
        expect(onReservar).toHaveBeenCalledWith({ socio: 'Marta', correo: 'marta@marta.com' })
        expect(screen.getByLabelText('Nombre del socio')).toHaveValue('')
        expect(screen.getByLabelText('Correo')).toHaveValue('')
    })
    it('muestra el error de que falta el nombre', async () => {
        const usuario = userEvent.setup()
        const onReservar = vi.fn()
        render(<FormularioReserva onReservar={onReservar} />)
        await usuario.type(screen.getByLabelText('Nombre del socio'), '  ')
        await usuario.type(screen.getByLabelText('Correo'), '  marta@marta.com')
        await usuario.click(screen.getByRole('button', { name: 'Reservar libro' }))

        expect(onReservar).toHaveBeenCalledTimes(0)
        expect(screen.getByText('Escribe tu nombre')).toBeInTheDocument()
    })

    it('muestra el error de que el email no es válido', async () => {
        const usuario = userEvent.setup()
        const onReservar = vi.fn()
        render(<FormularioReserva onReservar={onReservar} />)
        await usuario.type(screen.getByLabelText('Nombre del socio'), ' marta ')
        await usuario.type(screen.getByLabelText('Correo'), '  marta.com')
        await usuario.click(screen.getByRole('button', { name: 'Reservar libro' }))

        expect(onReservar).toHaveBeenCalledTimes(0)
        expect(screen.getByText('El correo no es válido')).toBeInTheDocument()
        // expect(onReservar).not.toHaveBeenCalled()
        // expect(screen.getByRole('alert')).toHaveTextContent('El correo no es válido')
    })
})