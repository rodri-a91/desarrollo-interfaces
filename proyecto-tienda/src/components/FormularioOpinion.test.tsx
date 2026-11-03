import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioOpinion from './FormularioOpinion'

describe('FormularioOpinion', () => {
  it('envía los datos sin espacios sobrantes y vacía los campos', async () => {
    const usuario = userEvent.setup()
    const onEnviar = vi.fn()
    render(<FormularioOpinion onEnviar={onEnviar} />)

    await usuario.type(screen.getByLabelText('Tu nombre'), '  Ana ')
    await usuario.type(screen.getByLabelText('Tu opinión'), ' Muy buena ')
    await usuario.click(screen.getByRole('button', { name: 'Enviar opinión' }))

    expect(onEnviar).toHaveBeenCalledWith({ nombre: 'Ana', texto: 'Muy buena' })
    expect(screen.getByLabelText('Tu opinión')).toHaveValue('')
  })

  it('no envía nada si la opinión está vacía y lo avisa', async () => {
    const usuario = userEvent.setup()
    const onEnviar = vi.fn()
    render(<FormularioOpinion onEnviar={onEnviar} />)

    await usuario.click(screen.getByRole('button', { name: 'Enviar opinión' }))

    expect(onEnviar).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Escribe tu opinión')
  })
})