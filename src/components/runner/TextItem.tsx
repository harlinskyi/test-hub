import React from 'react'
import { Input } from 'antd'
import { FormTypeFields, TestListRunnerItem } from '../../types'
import useTestRunnerContext from '../../context/TestRunnerContext/useTestRunnerContext'
import HelperText from './HelperText'

const NumberItem: React.FC<TestListRunnerItem<FormTypeFields.Text>> = ({
  id,
  clientAnswer,
}): JSX.Element => {
  const { onAnswer } = useTestRunnerContext()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(id, e.target.value)
  }
  return (
    <>
      <Input
        value={clientAnswer}
        onChange={onChange}
        style={{ width: '100%' }}
        size="large"
      />
      <HelperText text="Введіть відповідь у довільному форматі" />
    </>
  )
}

export default NumberItem
