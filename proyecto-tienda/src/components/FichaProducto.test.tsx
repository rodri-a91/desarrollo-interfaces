import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import FichaProducto from './FichaProducto'

describe('FichaProducto', () => {
  it('muestra el nombre y una línea por característica', () => {
    render(<FichaProducto nombre="Mochila" caracteristicas={['Impermeable', '20 litros']} />)
    expect(screen.getByRole('heading', { name: 'Mochila' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Impermeable')).toBeInTheDocument()
  })

  it('avisa si no hay características', () => {
    render(<FichaProducto nombre="Mochila" caracteristicas={[]} />)
    expect(screen.getByText('Sin características')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('tiene el botón de añadir al carrito', () => {
    render(<FichaProducto nombre="Mochila" caracteristicas={[]} />)
    expect(screen.getByRole('button', { name: 'Añadir al carrito' })).toBeInTheDocument()
  })
})