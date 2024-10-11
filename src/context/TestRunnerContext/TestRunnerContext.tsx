import dayjs from 'dayjs'
import { createContext } from 'react'
import { CalculateData, TestListRunnerItem } from '../../types'

export type TestRunnerContextType = {
  nextQuestion: () => void
  prevQuestion: () => void
  questions: TestListRunnerItem[]
  onAnswer: (questionId: number, answer: string | string[]) => void
  currentQuestionId: number
  currentQuestion: () => TestListRunnerItem | undefined
  goToQuestion: (questionId: number) => void
  allowFinish: boolean
  calculatedData: CalculateData | undefined
  onClickFinish: () => void
  finishTime: dayjs.Dayjs | undefined
  startTime: dayjs.Dayjs
}

const TestRunnerContext = createContext<TestRunnerContextType>({
  nextQuestion: () => {},
  prevQuestion: () => {},
  questions: [],
  onAnswer: () => {},
  currentQuestionId: 0,
  currentQuestion: () => undefined,
  goToQuestion: () => {},
  allowFinish: false,
  calculatedData: undefined,
  onClickFinish: () => {},
  finishTime: undefined,
  startTime: dayjs(),
})

export default TestRunnerContext
