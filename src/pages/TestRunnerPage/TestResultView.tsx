import { Button, Collapse, Descriptions, Flex, Tag } from 'antd'
import useTestRunnerContext from '../../context/TestRunnerContext/useTestRunnerContext'
import { FormTypeFields } from '../../types'
import { useNavigate } from 'react-router-dom'
import Timer from '../../components/Timer'
import { getHomeRoute, getSelectTestRoute } from '../../routes/routeConstants'

const TestResultView = () => {
  const navigate = useNavigate()
  const { calculatedData, startTime, finishTime } = useTestRunnerContext()

  const getTagByRating = (rating: number) => {
    if (rating === 100) {
      return '#87d068'
    }
    if (rating > 50) {
      return '#eb2f96'
    }
    if (rating > 0) {
      return '#faad14'
    }
    return '#f00'
  }

  const getBgColorByRating = (rating: number) => {
    if (rating === 100) {
      return '#f6ffed'
    }
    if (rating > 50) {
      return '#fff0f6'
    }
    if (rating > 0) {
      return '#fff7e6'
    }
    return '#fff1f0'
  }

  const getColorByRating = (rating: number) => {
    if (rating === 100) {
      return '#52c41a'
    }
    if (rating > 50) {
      return '#c41d7f'
    }
    if (rating > 0) {
      return '#d46b08'
    }
    return '#cf1322'
  }

  if (calculatedData) {
    return (
      <div
        style={{
          padding: '0 24px',
        }}
      >
        <h1
          style={{
            marginTop: 0,
            textAlign: 'center',
          }}
        >
          Результат тесту
        </h1>
        <h2>
          У вас{' '}
          {Math.round(
            calculatedData.totalRating / calculatedData.totalQuestions
          )}{' '}
          із {100} балів | Час тесту:{' '}
          <Timer startDate={startTime} endDate={finishTime} />
        </h2>
        <Collapse
          style={{ overflow: 'hidden' }}
          items={calculatedData.questions.map((item) => ({
            key: item.id,
            label: (
              <span
                style={{
                  color: getColorByRating(item.rating),
                }}
              >
                {item.question}
              </span>
            ),
            extra: (
              <Tag
                color={getTagByRating(item.rating)}
                style={{ fontWeight: 'bold' }}
              >
                {item.rating}%
              </Tag>
            ),
            style: {
              backgroundColor: getBgColorByRating(item.rating),
            },
            children: (
              <Descriptions
                bordered
                size="small"
                column={1}
                items={[
                  {
                    key: 'correctAnswer',
                    label: 'Правильна відповідь',
                    children:
                      item.field_type == FormTypeFields.Checkbox ||
                      item.field_type == FormTypeFields.Radio
                        ? item.options
                            ?.filter((option) => option.isAnswer)
                            .map((option) => option.value)
                            .join(', ') ||
                          'Серед варіантів не було правильних варіантів'
                        : item.answer,
                  },
                  {
                    key: 'answer',
                    label: 'Ваша відповідь',
                    children:
                      item.field_type == FormTypeFields.Checkbox &&
                      typeof item.clientAnswer === 'object'
                        ? item.clientAnswer.length
                          ? item.clientAnswer?.join(', ')
                          : 'Ви не вибрали жодної відповіді'
                        : item.clientAnswer,
                  },
                ]}
              />
            ),
          }))}
        />
        <Flex gap={16} justify="center" style={{ marginTop: 16 }}>
          <Button onClick={() => navigate(getHomeRoute())}>На головну</Button>
          <Button onClick={() => navigate(getSelectTestRoute())}>
            Обрати інший тест
          </Button>
        </Flex>
      </div>
    )
  }
}

export default TestResultView
