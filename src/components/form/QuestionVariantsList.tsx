import { useEffect } from 'react'

import { Button, Form, Input } from 'antd'

import { FormTypeFields } from '../../types'
import QuestionVariantsListItem from './QuestionVariantsListItem'

type Props = {
  field: any
  fieldTypeNamePath: (string | number)[]
}

const QuestionVariantsList = ({
  field,
  fieldTypeNamePath,
  ...props
}: Props) => {
  const form = Form.useFormInstance()
  const fieldType = Form.useWatch(fieldTypeNamePath, form)

  useEffect(() => {
    if (fieldType) {
      form.setFieldsValue({
        items: {
          [field.name]: {
            options: undefined,
            answer: undefined,
          },
        },
      })
    }
  }, [fieldType])

  const renderOptionFields = () => {
    return (
      <Form.Item label="Варіанти відповідей">
        <Form.List
          name={[field.name, 'options']}
          {...props}
          rules={[
            {
              validator(rule, value, callback) {
                if (value.length < 2) {
                  return Promise.reject('Додайте хоча б два варіанти')
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          {(subFields, subOpt) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 16,
              }}
            >
              {subFields.map((subField) => (
                <QuestionVariantsListItem
                  subField={subField}
                  subOpt={subOpt}
                  fieldName={field.name}
                  fieldType={fieldType}
                />
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  subOpt.add({ value: '', isAnswer: subFields.length === 0 })
                }
                block
              >
                + Додати варіант
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>
    )
  }

  const renderNumberField = () => {
    return (
      <Form.Item label="Відповідь" required name={[field.name, 'answer']}>
        <Input type="number" />
      </Form.Item>
    )
  }

  const renderTextField = () => {
    return (
      <Form.Item label="Відповідь" required name={[field.name, 'answer']}>
        <Input />
      </Form.Item>
    )
  }

  if ([FormTypeFields.Checkbox, FormTypeFields.Radio].includes(fieldType)) {
    return renderOptionFields()
  }

  if (fieldType === FormTypeFields.Number) {
    return renderNumberField()
  }

  if (fieldType === FormTypeFields.Text) {
    return renderTextField()
  }

  return null
}

export default QuestionVariantsList
