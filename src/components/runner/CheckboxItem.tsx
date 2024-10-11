import { Checkbox, Divider } from 'antd'
import { FormTypeFields, TestListRunnerItem } from '../../types'
import useTestRunnerContext from '../../context/TestRunnerContext/useTestRunnerContext'
import HelperText from './HelperText'

const CheckboxGroup = Checkbox.Group

const CheckboxItem: React.FC<TestListRunnerItem<FormTypeFields.Checkbox>> = ({
  id,
  options,
  clientAnswer,
}): JSX.Element => {
  const { onAnswer } = useTestRunnerContext()

  const value = clientAnswer || []

  const checkboxOptions = (options || []).map((option) => {
    return { label: option.value, value: option.value }
  })

  const onChange = (checkedValues: string[]) => {
    onAnswer(id, checkedValues)
  }
  return (
    <>
      <CheckboxGroup
        options={checkboxOptions}
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
      />
      <HelperText text="Оберіть щонайменше один варіант" />
    </>
  )
}

export default CheckboxItem
