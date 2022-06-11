import { render, screen } from '@testing-library/react'
import Connect from '.'
import { useAccount } from '../../states/useAccount'
import { config } from '../../config'

jest.mock('../../states/useProvider')
jest.mock('../../states/useSigner')
jest.mock('../../states/useAccount')
const MuseAccount = useAccount as jest.Mock

describe('Connect component', () => {
    describe('account does not exist', () => {
        beforeEach(() => {
            jest.clearAllMocks
            MuseAccount.mockImplementation(() => { return undefined })
            render(<Connect />)
        })
        it('check button and button name', () => {
            expect(screen.getByRole('button')).toHaveTextContent('Connect Wallet')
        })
    })
    describe('account exist', () => {
        beforeEach(() => {
            MuseAccount.mockImplementation(() => {
                return { address: config.TEST_USER_ADDRESS, isAnswer: true, isMember: true }
            })
            render(<Connect />)
        })
        it('check button and button name', () => {
            expect(screen.queryByRole('button')).toBeNull()
        })
    })
})