import { describe, expect, it, vi } from "vitest";
import ContactoItem from "./ContactoItem";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe('ContactoItem', () => {
    it('se llama a la función al hacer click', async () => {
        const mock = vi.fn()
        render(<ContactoItem nombre="Sara" favorito telefono="616585475" onToggle={mock} />)
        await userEvent.click(screen.getByText(/Sara/))
        expect(mock).toHaveBeenCalled()
    })
})