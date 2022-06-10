import { render, screen } from '@testing-library/react'
import Account from '.'
import { useAccount } from '../../states/useAccount'
import { config } from '../../config'

jest.mock('../../states/useProvider')
jest.mock('../../states/useSigner')
jest.mock('../../states/useAccount')

describe('Account component', () => {
    beforeEach(() => {
        const MuseAccount = useAccount as jest.Mock
        MuseAccount.mockImplementation(() => {
            return { address: config.TEST_USER_ADDRESS, isAnswered: true, isMember: true }
        })
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