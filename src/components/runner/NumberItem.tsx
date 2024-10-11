import { InputNumber } from 'antd'
import React from 'react'
import useTestRunnerContext from '../../context/TestRunnerContext/useTestRunnerContext'
import { FormTypeFields, TestListRunnerItem } from '../../types'
import HelperText from './HelperText'

const NumberItem: React.FC<TestListRunnerItem<FormTypeFields.Number>> = ({
  clientAnswer,
  id,
}): JSX.Element => {
  const { onAnswer } = useTestRunnerContext()

  const onChange = (value: string | null) => {
    onAnswer(id, typeof value === 'number' ? `${value}` : value || '')
  }

  return (
    <>
      <InputNumber
        onChange={onChange}
        value={clientAnswer}
        style={{ width: '100%' }}
        size="large"
      />
      <HelperText text="Відповідь має бути числом" />
    </>
  )
}

export default NumberItem
