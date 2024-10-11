import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getHomeRoute } from '../../routes/routeConstants'
import { CalculateData, FormTypeFields, TestListRunnerItem } from '../../types'
import {
  calculateCheckboxAnswer,
  calculateRadioAnswer,
  shuffleArray,
} from '../../utils'
import TestRunnerContext, { TestRunnerContextType } from './TestRunnerContext'
dayjs.extend(duration)

type TestRunnerContextProviderProps = {
  children: React.ReactNode
}

const TestRunnerContextProvider: React.FC<TestRunnerContextProviderProps> = ({
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location)
  const data = location.state || ({} as { data: TestListRunnerItem[] })

  if (!data) {
    navigate(getHomeRoute())
  }
  const [startTime] = React.useState<dayjs.Dayjs>(dayjs())
  const [finishTime, setFinishTime] = React.useState<dayjs.Dayjs>()

  const [currentQuestionId, setCurrentQuestionId] = React.useState<number>(1)
  const [questions, setQuestions] = React.useState<TestListRunnerItem[]>(
    shuffleArray(data).map((item, index) => ({
      ...item,
      id: index + 1,
    }))
  )
  const [calculatedData, setCalculatedData] = React.useState<CalculateData>()

  const nextQuestion = () => {
    const nextQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestionId
    )
    if (nextQuestionIndex === questions.length - 1) return
    setCurrentQuestionId((prev) => prev + 1)
  }

  const prevQuestion = () => {
    const prevQuestionIndex = questions.findIndex(
      (question) => question.id === currentQuestionId
    )
    if (prevQuestionIndex === 0) return
    setCurrentQuestionId((prev) => prev - 1)
  }

  const goToQuestion = (questionId: number) => {
    setCurrentQuestionId(questionId)
  }

  const onAnswer = (questionId: number, answer: string | string[]) => {
    const questionIndex = questions.findIndex(
      (question) => question.id === questionId
    )
    setQuestions((prev) => {
      const newQuestions = [...prev]
      newQuestions[questionIndex].clientAnswer = answer
      return newQuestions
    })
  }

  const currentQuestion = useCallback(() => {
    return questions.find((question) => question.id === currentQuestionId)
  }, [currentQuestionId])

  const allowFinish = questions.every((question) => question.clientAnswer)

  const getCorrectRating = (question: TestListRunnerItem) => {
    switch (question.field_type) {
      case FormTypeFields.Checkbox:
        return calculateCheckboxAnswer(
          question?.options || [],
          (question?.clientAnswer || []) as string[]
        )
      case FormTypeFields.Radio:
        return calculateRadioAnswer(
          question?.options || [],
          (question.clientAnswer || '') as string
        )
      case FormTypeFields.Text:
      case FormTypeFields.Number:
        return question.answer == question.clientAnswer ? 100 : 0
      default:
        return 0
    }
  }

  const onClickFinish = () => {
    const newCalculatedData = questions.map((question) => {
      const rating = getCorrectRating(question)
      const isCorrect = rating === 100
      return {
        ...question,
        isCorrect,
        rating,
      }
    })
    setFinishTime(dayjs())
    setCalculatedData({
      questions: newCalculatedData,
      totalRating: newCalculatedData.reduce(
        (acc, item) => acc + item.rating,
        0
      ),
      totalQuestions: newCalculatedData.length,
    })
  }

  const value: TestRunnerContextType = {
    nextQuestion,
    prevQuestion,
    questions,
    onAnswer,
    currentQuestionId,
    currentQuestion,
    goToQuestion,
    allowFinish,
    onClickFinish,
    calculatedData,
    finishTime,
    startTime,
  }

  return (
    <TestRunnerContext.Provider value={value}>
      {children}
    </TestRunnerContext.Provider>
  )
}

export default TestRunnerContextProvider
