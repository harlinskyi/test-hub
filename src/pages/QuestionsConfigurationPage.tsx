import { CloseOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Layout,
  Select,
  Typography,
  notification,
} from 'antd'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { RiListCheck3, RiListRadio } from 'react-icons/ri'
import { TbAbc, TbNumber123 } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import QuestionVariantsList from '../components/form/QuestionVariantsList'
import { FormTypeFields } from '../types'
import { useState } from 'react'
import { SaveOutlined } from '@ant-design/icons'
import { FaCode } from 'react-icons/fa6'
import { hasDuplicates } from '../utils'
import { getHomeRoute, getRunRoute } from '../routes/routeConstants'

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
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [showFormValues, setShowFormValues] = useState(false)

  const optionRender = (item: any) => (
    <Flex align="center" gap={8}>
      {FormTypeFieldsOptions[item?.value as FormTypeFields].icon}
      <Typography.Text>{item.label}</Typography.Text>
    </Flex>
  )

  const onClickFinish = () => {
    form
      .validateFields()
      .then((values) => {
        navigate(getRunRoute(), { state: values?.items || [] })
      })
      .catch((error: any) => {
        notification.error({
          message: 'Помилка валідації',
          description: error.errorFields
            ?.map((field: any) => field.errors.join(','))
            .map((error: any, index: number) => (
              <div key={error + index}>- {error}</div>
            )),
        })
      })
  }
  const onFinish = (values: any) => {
    navigate('/run', { state: values?.items || [] })
  }

  return (
    <Layout.Content style={{ minHeight: 280 }}>
      <Flex gap={10}>
        <Button
          type="default"
          onClick={() => navigate(getHomeRoute())}
          icon={<IoMdArrowRoundBack />}
          style={{ marginBottom: 16 }}
        >
          Назад
        </Button>
        <Button
          icon={<FaCode />}
          type="dashed"
          onClick={() => setShowFormValues((prev) => !prev)}
        />
      </Flex>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onError={(error) => console.log(error)}
        autoComplete="off"
        initialValues={{ items: [{}] }}
      >
        <Form.List
          name="items"
          rules={[
            {
              validator(rule, value, callback) {
                if (value?.length < 2) {
                  return Promise.reject('Додайте хоча б два питання')
                }
                if (
                  hasDuplicates(value.map((item: any) => item?.question || ''))
                ) {
                  return Promise.reject('Питання не повинні повторюватися')
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
                    <Input size="large" />
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
                      size="large"
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
        <Form.Item
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            type="primary"
            onClick={onClickFinish}
            icon={<SaveOutlined />}
            style={{ marginTop: 16 }}
            size="large"
          >
            Зберегти та продовжити
          </Button>
        </Form.Item>
        {showFormValues && (
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography.Paragraph>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography.Paragraph>
            )}
          </Form.Item>
        )}
      </Form>
    </Layout.Content>
  )
}

export default QuestionsConfigurationPage
