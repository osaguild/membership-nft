import { render, screen } from '@testing-library/react'
import Account from '.'
import { useAccount } from '../../states/useAccount'
import { config } from '../../config'

jest.mock('../../states/useProvider')
jest.mock('../../states/useSigner')
jest.mock('../../states/useAccount')
const MuseAccount = useAccount as jest.Mock

describe('Account component', () => {
    describe('account does not exist', () => {
        beforeEach(() => {
            jest.clearAllMocks()
            MuseAccount.mockImplementation(() => { return undefined })
            render(<Account />)
        })
        it('address chip does not exist', () => {
            expect(screen.queryByText('...a77')).toBeNull()
        })
        it('answered chip does not exist', () => {
            expect(screen.queryByText('Answered')).toBeNull()
        })
        it('member chip does not exist', () => {
            expect(screen.queryByText('Member')).toBeNull()
        })
        it('login button does not exist', () => {
            expect(screen.queryByText('Login')).toBeNull()
        })
    })
    describe('account exist', () => {
        beforeEach(() => {
            jest.clearAllMocks()
            MuseAccount.mockImplementation(() => {
                return { address: config.TEST_USER_ADDRESS, isAnswered: true, isMember: true }
            })
            render(<Account />)
        })
        it('address chip exist', () => {
            expect(screen.getByText('...a77')).toBeTruthy()
        })
        it('answered chip exist', () => {
            expect(screen.getByText('Answered')).toBeTruthy()
        })
        it('member chiop exist', () => {
            expect(screen.getByText('Member')).toBeTruthy()
        })
        it('login button exist', () => {
            expect(screen.getByText('Login')).toBeTruthy()
        })
    })
})