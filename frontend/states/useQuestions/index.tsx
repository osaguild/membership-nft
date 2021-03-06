import { JsonRpcProvider } from '@ethersproject/providers'
import { useState, useEffect } from 'react'
import { Checker__factory } from "../../typechain-types"
import { config } from "../../config"

export const useQuestions = (provider: JsonRpcProvider | undefined) => {
    const [questions, setQuestions] = useState<Question[] | undefined>()

    const init = async () => {
        if (provider === undefined) {
            setQuestions(undefined)
            return
        }
        try {
            const checker = Checker__factory.connect(config.CHECKER_CONTRACT_ADDRESS, provider)
            const countOfQuestions = await checker.getCountOfQuestions()
            if (countOfQuestions.toNumber() === 0) {
                setQuestions(undefined)
                return
            }
            const _questions: Question[] = []
            for (let i = 1; i <= countOfQuestions.toNumber(); i++) {
                _questions.push({ id: i, question: await checker.getQuestion(i) })
            }
            setQuestions(_questions)
        } catch (error) {
            setQuestions(undefined)
        }
    }

    useEffect(() => {
        init()
    }, [provider])

    return questions
}