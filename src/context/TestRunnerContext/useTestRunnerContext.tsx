import { useContext } from 'react'
import TestRunnerContext from './TestRunnerContext'

const useTestRunnerContext = () => {
  const context = useContext(TestRunnerContext)

  return context
}

export default useTestRunnerContext
