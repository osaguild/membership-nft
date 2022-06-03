export function questionsToArray(questions: Question[]): [number[], string[], boolean[]] {
  const ids: number[] = []
  const texts: string[] = []
  const answers: boolean[] = []
  for (const question of questions) {
    ids.push(question.id)
    texts.push(question.text)
    if (typeof question.answer === "boolean") {
      answers.push(question.answer)
    }
  }
  return [ids, texts, answers]
}