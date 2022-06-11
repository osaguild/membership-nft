import { render, screen } from '@testing-library/react'
import Form from '.'
import { useAccount } from '../../states/useAccount'
import { useQuestions } from '../../states/useQuestions'
import { useAnswers } from '../../states/useAnswers'
import { config } from '../../config'

jest.mock('../../states/useProvider')
jest.mock('../../states/useSigner')
jest.mock('../../states/useQuestions')
jest.mock('../../states/useAnswers')
jest.mock('../../states/useAccount')
const MuseQuestions = useQuestions as jest.Mock
const MuseAnswers = useAnswers as jest.Mock
const MuseAccount = useAccount as jest.Mock

describe('Connect component', () => {
    describe('questions ans answers do not exist', () => {
        beforeEach(() => {
            jest.clearAllMocks
            MuseQuestions.mockImplementation(() => {
                return undefined
            })
            MuseAnswers.mockImplementation(() => {
                return undefined
            })
            MuseAccount.mockImplementation(() => {
                return { address: config.TEST_USER_ADDRESS, isAnswered: true, isMember: true }
            })
            render(<Form />)
        })
        it('error message', () => {
            expect(screen.getByText('Failed to load questions.')).toBeInTheDocument()
        })
    })
    describe('questions ans answers exist', () => {
        beforeEach(() => {
            jest.clearAllMocks
            MuseQuestions.mockImplementation(() => {
                return [
                    { id: 1, question: "question 1" },
                    { id: 2, question: "question 2" },
                    { id: 3, question: "question 3" }
                ]
            })
            MuseAnswers.mockImplementation(() => {
                return [
                    { id: 1, answer: true },
                    { id: 2, answer: true },
                    { id: 3, answer: true }
                ]
            })
            MuseAccount.mockImplementation(() => {
                return { address: config.TEST_USER_ADDRESS, isAnswered: true, isMember: true }
            })
            render(<Form />)
        })
        it('check questions', () => {
            expect(screen.getByRole('question1')).toHaveTextContent('question 1')
            expect(screen.getByRole('question2')).toHaveTextContent('question 2')
            expect(screen.getByRole('question3')).toHaveTextContent('question 3')
        })
        /*
        it('check answers', () => {
            screen.debug()
            expect(screen.getByTestId('answer1')).toHaveValue("true")
            expect(screen.getByTestId('answer2')).toHaveValue("true")
            expect(screen.getByTestId('answer3')).toHaveValue("true")
        })
        */
        it('check button', () => {
            expect(screen.getByRole('button', { name: 'Regist' })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Join Us' })).toBeInTheDocument()
        })
    })
})