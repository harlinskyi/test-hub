import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  Row,
  Select,
  Space,
  theme,
  Typography,
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './App.css'
import logo from './assets/logo.png'
import QuestionVariantsList from './components/form/QuestionVariantsList'
import { FormTypeFields } from './types'
import { RiListRadio, RiListCheck3 } from 'react-icons/ri'
import { TbNumber123 } from 'react-icons/tb'
import { TbAbc } from 'react-icons/tb'
const { Header, Content, Footer, Sider } = Layout

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

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [form] = Form.useForm()

  const optionRender = (item: any) => (
    <Flex align="center" gap={8}>
      {FormTypeFieldsOptions[item?.value as FormTypeFields].icon}
      <Typography.Text>{item.label}</Typography.Text>
    </Flex>
  )

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: '#1e2d50' }} className="header">
        <Row>
          <Col>
            <Image src={logo} preview={false} height={30} />
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: 48, height: '100%' }} className="content">
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              style={{ height: '100%' }}
              items={[
                {
                  key: '1',
                  title: 'nav 1',
                  label: 'nav 1',
                },
                {
                  key: '2',
                  title: 'nav 2',
                  label: 'nav 2',
                },
                {
                  key: '3',
                  title: 'nav 3',
                  label: 'nav 3',
                },
              ]}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
                          <Input />
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
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }} className="footer">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App
