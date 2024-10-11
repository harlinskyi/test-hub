import { Button, Collapse, Descriptions, Flex, Tag } from 'antd'
import useTestRunnerContext from '../../context/TestRunnerContext/useTestRunnerContext'
import { FormTypeFields } from '../../types'
import TestRunnerQuestion from './TestRunnerQuestionView'
import { useNavigate } from 'react-router-dom'
import TestResultView from './TestResultView'

const TestRunnerPage = () => {
  const navigate = useNavigate()
  const { questions, currentQuestionId, currentQuestion, calculatedData } =
    useTestRunnerContext()

  const question = currentQuestion()

  const getTagByRating = (rating: number) => {
    if (rating === 100) {
      return '#87d068'
    }
    if (rating > 50) {
      return '#eb2f96'
    }
    if (rating > 0) {
      return '#faad14'
    }
    return '#f00'
  }

  const getBgColorByRating = (rating: number) => {
    if (rating === 100) {
      return '#f6ffed'
    }
    if (rating > 50) {
      return '#fff0f6'
    }
    if (rating > 0) {
      return '#fff7e6'
    }
    return '#fff1f0'
  }

  const getColorByRating = (rating: number) => {
    if (rating === 100) {
      return '#52c41a'
    }
    if (rating > 50) {
      return '#c41d7f'
    }
    if (rating > 0) {
      return '#d46b08'
    }
    return '#cf1322'
  }

  if (calculatedData) {
    return <TestResultView />
  }
  return <div>{question && <TestRunnerQuestion {...question} />}</div>
}

export default TestRunnerPage
