export function shuffleArray(array: Array<any>) {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

export function calculateCheckboxAnswer(
  answers: { value: string; isAnswer: boolean }[],
  selectedAnswers: string[]
): number {
  const correctAnswers = answers
    .filter((answer) => answer.isAnswer)
    .map((answer) => answer.value)

  const correctSelected = selectedAnswers.filter((selected) =>
    correctAnswers.includes(selected)
  )
  const incorrectSelected = selectedAnswers.filter(
    (selected) => !correctAnswers.includes(selected)
  )

  // Рахуємо % правильних відповідей
  const correctPercentage =
    (correctSelected.length / correctAnswers.length) * 100

  // Рахуємо штраф за неправильні відповіді, як % від загальної кількості правильних
  const penaltyPercentage = (incorrectSelected.length / answers.length) * 100

  // Вираховуємо кінцевий результат з врахуванням штрафу
  const finalPercentage = correctPercentage - penaltyPercentage

  // Результат не може бути меншим за 0
  return Math.max(0, parseFloat(finalPercentage.toFixed(2)))
}

export function calculateRadioAnswer(
  answers: { value: string; isAnswer: boolean }[],
  selectedAnswer: string
): number {
  const correctAnswer = answers.find((answer) => answer.isAnswer)?.value

  return correctAnswer == selectedAnswer ? 100 : 0
}

export function hasDuplicates(array: string[]): boolean {
  const seen = new Set()
  for (const item of array) {
    if (seen.has(item)) {
      return true
    }
    seen.add(item)
  }
  return false
}


export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) | 0x40;
      const v = c === 'x' ? r : (r & 0x3f) | 0x80;
      return v.toString(16);
  });
}