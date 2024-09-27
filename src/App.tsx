import {
    Button,
    Card,
    Col,
    Form,
    Image,
    Input,
    Layout,
    Menu,
    Row,
    Space,
    theme,
    Typography,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './App.css';
import logo from './assets/logo.png';
const { Header, Content, Footer, Sider } = Layout;

enum FormTypeFields {
    Text = 'text',
    Checkbox = 'checkbox',
    Radio = 'radio',
    Number = 'number',
}

type TestListItem<T = FormTypeFields> = {
    question: string;
    type_info: {
        type: T;
        options?: T extends FormTypeFields.Checkbox | FormTypeFields.Radio ? string[] : never;
    };
    answer: T extends FormTypeFields.Number
        ? number
        : T extends FormTypeFields.Checkbox
        ? string[]
        : T extends FormTypeFields.Radio
        ? string
        : T extends FormTypeFields.Text
        ? string
        : never;
};

const TestsList_mock: TestListItem[] = [
    {
        question: 'What is year now?',
        type_info: { type: FormTypeFields.Number },
        answer: 2024,
    },
    {
        question: 'What is programming language?',
        type_info: {
            type: FormTypeFields.Checkbox,
            options: ['JavaScript', 'Python', 'Java', 'HTML'],
        },
        answer: ['JavaScript', 'Python', 'Java'],
    },
    {
        question: 'How much days in week?',
        type_info: { type: FormTypeFields.Number },
        answer: 7,
    },
    {
        question: 'What is operating system?',
        type_info: {
            type: FormTypeFields.Checkbox,
            options: ['Windows', 'Linux', 'MacOS', 'Word'],
        },
        answer: ['Windows', 'Linux', 'MacOS'],
    },
    {
        question: 'Що є основним джерелом енергії для живих організмів?',
        type_info: {
            type: FormTypeFields.Radio,
            options: ['Вода', 'Сонячне світло', 'Кисень', 'Вуглекислий газ'],
        },
        answer: 'Сонячне світло',
    },
    {
        question: 'Яка формула води?',
        type_info: { type: FormTypeFields.Text },
        answer: 'H2O',
    },
    {
        question: 'Який рік вважається початком Другої світової війни?',
        type_info: { type: FormTypeFields.Radio, options: ['1939', '1941', '1945', '1943'] },
        answer: '1939',
    },
    {
        question: 'Який орган відповідає за циркуляцію крові в організмі людини?',
        type_info: {
            type: FormTypeFields.Radio,
            options: ['Серце', 'Печінка', 'Легені', 'Шлунок'],
        },
        answer: 'Серце',
    },
];

function App() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [form] = Form.useForm();

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
                    }}>
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
                            autoComplete="off"
                            initialValues={{ items: [{}] }}>
                            <Form.List name="items">
                                {(fields, { add, remove }) => (
                                    <div
                                        style={{
                                            display: 'flex',
                                            rowGap: 16,
                                            flexDirection: 'column',
                                        }}>
                                        {fields.map(field => (
                                            <Card
                                                size="small"
                                                title={`Item ${field.name + 1}`}
                                                key={field.key}
                                                extra={
                                                    <CloseOutlined
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                    />
                                                }>
                                                <Form.Item label="Name" name={[field.name, 'name']}>
                                                    <Input />
                                                </Form.Item>

                                                {/* Nest Form.List */}
                                                <Form.Item label="List">
                                                    <Form.List name={[field.name, 'list']}>
                                                        {(subFields, subOpt) => (
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    rowGap: 16,
                                                                }}>
                                                                {subFields.map(subField => (
                                                                    <Space key={subField.key}>
                                                                        <Form.Item
                                                                            noStyle
                                                                            name={[
                                                                                subField.name,
                                                                                'first',
                                                                            ]}>
                                                                            <Input placeholder="first" />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            noStyle
                                                                            name={[
                                                                                subField.name,
                                                                                'second',
                                                                            ]}>
                                                                            <Input placeholder="second" />
                                                                        </Form.Item>
                                                                        <CloseOutlined
                                                                            onClick={() => {
                                                                                subOpt.remove(
                                                                                    subField.name,
                                                                                );
                                                                            }}
                                                                        />
                                                                    </Space>
                                                                ))}
                                                                <Button
                                                                    type="dashed"
                                                                    onClick={() => subOpt.add()}
                                                                    block>
                                                                    + Add Sub Item
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </Form.List>
                                                </Form.Item>
                                            </Card>
                                        ))}

                                        <Button type="dashed" onClick={() => add()} block>
                                            + Add Item
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
                        </Form>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }} className="footer">
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
}

export default App;
