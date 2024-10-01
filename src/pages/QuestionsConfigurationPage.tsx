import { CloseOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, Input, Select, Typography } from 'antd'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { RiListCheck3, RiListRadio } from 'react-icons/ri'
import { TbAbc, TbNumber123 } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import QuestionVariantsList from '../components/form/QuestionVariantsList'
import { FormTypeFields } from '../types'

const FormTypeFieldsOptions = {
  [FormTypeFields.Text]: {
    label: 'Текст',
    icon: <TbAbc color="green" />,
  },
  [FormTypeFields.Number]: {
    label: 'Число',
    icon: <TbNumber123 color="blue" />,
  },
  [FormTypeFields.Radio]: {
    label: 'Один варіант із списку',
    icon: <RiListRadio color="red" />,
  },
  [FormTypeFields.Checkbox]: {
    label: 'Декілька варіантів із списку',
    icon: <RiListCheck3 color="purple" />,
  },
}

function QuestionsConfigurationPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const optionRender = (item: any) => (
    <Flex align="center" gap={8}>
      {FormTypeFieldsOptions[item?.value as FormTypeFields].icon}
      <Typography.Text>{item.label}</Typography.Text>
    </Flex>
  )

  return (
    <>
      <div>
        <Button
          type="default"
          onClick={() => navigate('/')}
          size="large"
          icon={<IoMdArrowRoundBack />}
          style={{ marginBottom: 16 }}
        >
          Назад
        </Button>
      </div>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={(values) => {
          console.log('onFinish', values)
        }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
      >
        <Form.List
          name="items"
          rules={[
            {
              validator(rule, value, callback) {
                if (value.length < 2) {
                  return Promise.reject('Додайте хоча б два питання')
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <div
              style={{
                display: 'flex',
                rowGap: 16,
                flexDirection: 'column',
              }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Питання ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name)
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="Питання"
                    required
                    rules={[{ required: true }]}
                    name={[field.name, 'question']}
                  >
                    <Input size='large'/>
                  </Form.Item>
                  <Form.Item
                    label="Тип відповіді"
                    rules={[{ required: true }]}
                    required
                    name={[field.name, 'field_type']}
                  >
                    <Select
                      optionRender={optionRender}
                      labelRender={optionRender}
                      size='large'
                      options={Object.entries(FormTypeFieldsOptions).map(
                        ([value, options]) => ({
                          value,
                          ...options,
                        })
                      )}
                    />
                  </Form.Item>
                  {/* Nest Form.List */}
                  <Form.Item noStyle shouldUpdate>
                    {() => (
                      <Form.Item noStyle>
                        <QuestionVariantsList
                          field={field}
                          fieldTypeNamePath={[
                            'items',
                            field.name,
                            'field_type',
                          ]}
                        />
                      </Form.Item>
                    )}
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Додати питання
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default QuestionsConfigurationPage
