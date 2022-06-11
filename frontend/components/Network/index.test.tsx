import { render, screen } from '@testing-library/react'
import Network from '.'
import { useNetwork } from '../../states/useNetwork'

jest.mock('../../states/useProvider')
jest.mock('../../states/useNetwork')
const MuseNetwork = useNetwork as jest.Mock

describe('Network component', () => {
    describe('homestead', () => {
        beforeEach(() => {
            jest.clearAllMocks
            MuseNetwork.mockImplementation(() => {
                return { name: 'homestead', chainId: 1, ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' }
            })
            render(<Network />)
        })
        it('selected ethereum', () => {
            expect(screen.getByRole('button', { name: "Ethereum" })).toBeInTheDocument()
        })
    })
    describe('rinkeby', () => {
        beforeEach(() => {
            jest.clearAllMocks
            MuseNetwork.mockImplementation(() => {
                return { name: 'rinkeby', chainId: 4, ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' }
            })
            render(<Network />)
        })
        it('selected rinkeby', () => {
            expect(screen.getByRole('button', { name: "Rinkeby" })).toBeInTheDocument()
        })
    })
    describe('matic', () => {
        beforeEach(() => {
            jest.clearAllMocks
            MuseNetwork.mockImplementation(() => {
                return { name: 'matic', chainId: 137, ensAddress: null }
            })
            render(<Network />)
        })
        it('selected matic', () => {
            expect(screen.getByRole('button', { name: "Matic" })).toBeInTheDocument()
        })
    })
})