import { render, screen } from '@testing-library/react'
import Connect from '.'
import { useAccount } from '../../states/useAccount'

jest.mock('../../states/useProvider')
jest.mock('../../states/useSigner')
jest.mock('../../states/useAccount')


describe('Connect component', () => {
    beforeEach(() => {
        const MuseAccount = useAccount as jest.Mock
        MuseAccount.mockImplementation(()=>{
            return undefined
        })
        render(<Connect />)
    })
    it('check button and button name', () => {
        expect(screen.getByRole('button')).toBeTruthy()
        expect(screen.getByText('Connect Wallet')).toBeTruthy()
    })
})