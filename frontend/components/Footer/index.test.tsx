import { render, screen } from '@testing-library/react'
import Footer from '.'

describe('Footer component', () => {
    it('footer text', () => {
        render(<Footer />)
        expect(screen.getByText('@2022 osaguild.com')).toBeTruthy()
    })
})