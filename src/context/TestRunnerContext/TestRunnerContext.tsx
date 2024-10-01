import { createContext } from 'react'

export type TestRunnerContextType = {
  isRunning: boolean
  setIsRunning: (isRunning: boolean) => void
}

const TestRunnerContext = createContext<TestRunnerContextType | undefined>(
  undefined
)

export default TestRunnerContext
