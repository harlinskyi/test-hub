import React from 'react'
import TestRunnerContext from './TestRunnerContext'

type TestRunnerContextType = {
  children: React.ReactNode
}

const TestRunnerContextProvider: React.FC<TestRunnerContextType> = ({
  children,
}) => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false)

  return (
    <TestRunnerContext.Provider value={{ isRunning, setIsRunning }}>
      {children}
    </TestRunnerContext.Provider>
  )
}

export default TestRunnerContextProvider
