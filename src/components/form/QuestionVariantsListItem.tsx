import { Button, Checkbox, Form, Input, Radio, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FormTypeFields } from '../../types'

type Props = {
  subField: any
  subOpt: any
  fieldName: string
  fieldType: FormTypeFields
}

const QuestionVariantsListItemAnswerCheckbox = ({ value, onChange }: any) => {
  return (
    <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}>
      Відповідь
    </Checkbox>
  )
}

const QuestionVariantsListItemAnswerRadio = ({
  value,
  onChange,
  onChangeHandlerRadio,
}: any) => {
  const form = Form.useFormInstance()

  const onChangeHandler = (e: CheckboxChangeEvent) => {
    onChangeHandlerRadio?.(e)
    onChange(e.target.checked)
  }

  return (
    <Radio checked={value} onChange={onChangeHandler}>
      Відповідь
    </Radio>
  )
}

const QuestionVariantsListItem = ({
  subField,
  subOpt,
  fieldType,
  fieldName,
}: Props) => {
  const form = Form.useFormInstance()
  const currentIsAnswer = Form.useWatch(
    ['items', fieldName, 'options', subField.name, 'isAnswer'],
    form
  )

  const onChangeHandlerRadio = (e: CheckboxChangeEvent) => {
    const currentFields = form.getFieldValue(['items', fieldName, 'options'])

    form.setFieldsValue({
      items: {
        [fieldName]: {
          options: currentFields.map((field: any) => ({
            ...field,
            isAnswer: false,
          })),
        },
      },
    })
  }

  return (
    <Space key={subField.key}>
      <Form.Item
        noStyle
        name={[subField.name, 'value']}
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item noStyle name={[subField.name, 'isAnswer']}>
        {fieldType == FormTypeFields.Checkbox && (
          <QuestionVariantsListItemAnswerCheckbox />
        )}
        {fieldType == FormTypeFields.Radio && (
          <QuestionVariantsListItemAnswerRadio
            onChangeHandlerRadio={onChangeHandlerRadio}
          />
        )}
      </Form.Item>
      <Button
        icon={<CloseOutlined />}
        danger
        disabled={currentIsAnswer}
        type="link"
        title="Видалити варіант"
        size="small"
        onClick={() => {
          subOpt.remove(subField.name)
        }}
      ></Button>
    </Space>
  )
}

export default QuestionVariantsListItem
