import { useState, useEffect } from 'react'

export const useAnswers = (
    _questions: Question[] | undefined,
    _answers: Answer[] | undefined,
) => {
    const [questions, setQuestions] = useState<Question[] | undefined>()
    const [answers, setAnswers] = useState<Answer[] | undefined>()

    const init = () => {
        if (_questions === undefined) {
            setQuestions(undefined)
            setAnswers(undefined)
        } else {
            setQuestions(_questions)
            const answers_: Answer[] = []
            for (const _question of _questions) {
                answers_.push({
                    id: _question.id,
                    answer: false,
                })
            }
            setAnswers(answers_)
        }
    }

    const update = () => {
        if (_answers === undefined) init()
        else setAnswers(_answers)
    }

    useEffect(() => {
        console.log("[useAnswer]useEffect", _questions, _answers)
        if (questions !== _questions) init()
        else if (answers !== _answers) update()
    }, [_questions, _answers])

    return answers
}