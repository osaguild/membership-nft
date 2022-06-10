import { render, screen } from '@testing-library/react'
import Account from '.'

jest.mock('../../states/useProvider')
jest.mock('../../states/useSigner')
jest.mock('../../states/useAccount')

describe('Account component', () => {
    beforeEach(() => {
        render(<Account />)
    })
    it('address', () => {
        expect(screen.getByText('...a77')).toBeTruthy()
    })
    it('answered', () => {
        expect(screen.getByText('Answered')).toBeTruthy()
    })
    it('member', () => {
        expect(screen.getByText('Member')).toBeTruthy()
    })
    it('login', () => {
        expect(screen.getByText('Login')).toBeTruthy()
    })
})