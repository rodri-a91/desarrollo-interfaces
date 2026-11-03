import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Producto from './Producto'

describe('Producto', () => {
  it('muestra el nombre como encabezado', () => {
    // Preparar: pintar el componente con unas props
    render(<Producto nombre="Camiseta" precio={19.9} stock={10} />)
    // Actuar y comprobar: buscar el encabezado y ver que está
    expect(screen.getByRole('heading', { name: 'Camiseta' })).toBeInTheDocument()
  })

  it('muestra el precio en euros', () => {
    render(<Producto nombre="Camiseta" precio={19.9} stock={10} />)
    expect(screen.getByText('19,90 €')).toBeInTheDocument()
  })

  it('indica que está agotado y no que está disponible', () => {
    render(<Producto nombre="Pantalón" precio={45} stock={0} />)
    expect(screen.getByText('Agotado')).toBeInTheDocument()
    expect(screen.queryByText('Disponible')).not.toBeInTheDocument()
  })
})