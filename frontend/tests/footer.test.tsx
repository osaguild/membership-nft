import { render, screen } from '@testing-library/react'
import Footer from '../components/footer'

describe('Footer component', () => {
    it('renders message', () => {
        render(<Footer />)
        expect(screen.getByText('@2022 osaguild.com')).toBeTruthy()
    })
})