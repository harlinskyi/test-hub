import {
  Alert,
  Button,
  Row,
  Col,
  Menu,
  Flex,
  Space,
  Typography,
  Divider,
} from 'antd'
import RunnerFieldItem from '../../components/runner'
import { TestListRunnerItem, FormTypeFields } from '../../types'
import useTestRunnerContext from '../../context/TestRunnerContext/useTestRunnerContext'
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  QuestionCircleOutlined,
  ArrowRightOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
} from '@ant-design/icons'
import Timer from '../../components/Timer'
import { TbDoorExit } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { getSelectTestRoute } from '../../routes/routeConstants'

const TestRunnerQuestionView: React.FC<TestListRunnerItem> = (props) => {
  const {
    nextQuestion,
    currentQuestion,
    questions,
    goToQuestion,
    prevQuestion,
    allowFinish,
    onClickFinish,
    startTime,
  } = useTestRunnerContext()
  const { id, question, field_type } = props
  const navigate = useNavigate()

  const renderQuestionFormItem = () => {
    const fieldKey = id.toString() + field_type
    switch (field_type) {
      case FormTypeFields.Checkbox:
        return (
          <RunnerFieldItem.Checkbox
            key={fieldKey}
            {...(props as TestListRunnerItem<FormTypeFields.Checkbox>)}
          />
        )
      case FormTypeFields.Radio:
        return (
          <RunnerFieldItem.Radio
            key={fieldKey}
            {...(props as TestListRunnerItem<FormTypeFields.Radio>)}
          />
        )
      case FormTypeFields.Number:
        return (
          <RunnerFieldItem.Number
            key={fieldKey}
            {...(props as TestListRunnerItem<FormTypeFields.Number>)}
          />
        )
      case FormTypeFields.Text:
        return (
          <RunnerFieldItem.Text
            key={fieldKey}
            {...(props as TestListRunnerItem<FormTypeFields.Text>)}
          />
        )
      default:
        return <Alert message="Unknown field type" type="error" />
    }
  }

  const curr = currentQuestion()

  const getIsDisabled = () => {
    if (!curr) {
      return true
    }
    const { clientAnswer } = curr
    if (field_type === FormTypeFields.Checkbox) {
      return !clientAnswer || clientAnswer.length === 0
    }
    return !clientAnswer
  }

  if (!curr) {
    return <Alert message="Question not found" type="error" />
  }

  const menuItems = questions.map(
    ({ id, question, clientAnswer }, index, arr) => ({
      key: id,
      icon: clientAnswer ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <QuestionCircleOutlined />
      ),
      label: `${index + 1}. ${question}`,
      disabled:
        !clientAnswer &&
        id !== curr?.id &&
        !arr[index - 1]?.clientAnswer &&
        index !== 0,
      style: { paddingLeft: 16 },
    })
  )
  return (
    <div>
      <Row>
        <Col className="gutter-row" span={6}>
          <Menu
            className="test-runner-side-menu"
            mode="inline"
            selectedKeys={[id.toString()]}
            onClick={({ key }: any) => {
              goToQuestion(Number(key))
            }}
            selectable={false}
            items={menuItems}
            style={{ height: '100%', maxHeight: '50vh', overflowY: 'auto' }}
          />
        </Col>
        <Col className="gutter-row" span={18} style={{ paddingLeft: '24px' }}>
          <div className="test-runner-question-header">
            <Flex justify="space-between" align="center">
              <Typography.Text strong>
                Питання {curr.id} з {questions.length}
              </Typography.Text>
              <Flex gap={10} align="center">
                <Typography.Title
                  level={2}
                  style={{ margin: 0, lineHeight: 1 }}
                >
                  <Timer startDate={startTime} />
                </Typography.Title>
                <Space.Compact>
                  <Button
                    type="default"
                    onClick={prevQuestion}
                    disabled={
                      curr.id === 1 ||
                      menuItems.find((item) => item.key === curr.id - 1)
                        ?.disabled
                    }
                    icon={<CaretLeftOutlined />}
                  />
                  <Button
                    type="default"
                    onClick={nextQuestion}
                    disabled={
                      curr.id === questions.length ||
                      menuItems.find((item) => item.key === curr.id + 1)
                        ?.disabled
                    }
                    icon={<CaretRightOutlined />}
                  />
                </Space.Compact>
                <Button
                  icon={<TbDoorExit />}
                  iconPosition="end"
                  type="dashed"
                  danger
                  onClick={() => {
                    navigate(getSelectTestRoute())
                  }}
                >
                  Вийти
                </Button>
              </Flex>
            </Flex>
          </div>
          <div className="test-runner-question-content">
            <h1>{question}</h1>
            <Divider />
            <div>{renderQuestionFormItem()}</div>
            <div>
              <Flex
                justify="end"
                align="center"
                gap={10}
                style={{ marginTop: 20 }}
              >
                {curr.id !== questions.length && (
                  <Button
                    type="default"
                    icon={<ArrowRightOutlined />}
                    onClick={nextQuestion}
                    iconPosition="end"
                    disabled={getIsDisabled()}
                  >
                    Наступне
                  </Button>
                )}
                {allowFinish && (
                  <Button
                    type="primary"
                    onClick={onClickFinish}
                    icon={<CheckCircleOutlined />}
                  >
                    Завершити тест
                  </Button>
                )}
              </Flex>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TestRunnerQuestionView
