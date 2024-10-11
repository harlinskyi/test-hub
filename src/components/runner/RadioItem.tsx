import { Radio, RadioChangeEvent } from 'antd'
import React from 'react'
import useTestRunnerContext from '../../context/TestRunnerContext/useTestRunnerContext'
import { FormTypeFields, TestListRunnerItem } from '../../types'
import HelperText from './HelperText'

const RadioGroup = Radio.Group

const RadioItem: React.FC<TestListRunnerItem<FormTypeFields.Radio>> = ({
  options,
  id,
  clientAnswer,
}): JSX.Element => {
  const { onAnswer } = useTestRunnerContext()

  const onChange = (e: RadioChangeEvent) => {
    onAnswer(id, e.target.value)
  }

  const radioOptions = (options || []).map((option) => {
    return { label: option.value, value: option.value }
  })

  return (
    <>
      <RadioGroup
        options={radioOptions}
        onChange={onChange}
        value={clientAnswer}
        style={{ width: '100%' }}
        size="large"
      />
      <HelperText text="Оберіть один варіант відповіді" />
    </>
  )
}

export default RadioItem
