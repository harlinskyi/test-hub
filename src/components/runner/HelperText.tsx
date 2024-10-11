import { Typography } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

type HelperTextProps = {
  text: string | number | JSX.Element
  style?: React.CSSProperties
}

const HelperText = ({ text, style }: HelperTextProps) => (
  <Typography.Text
    type="secondary"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 16,
      ...style,
    }}
  >
    <QuestionCircleOutlined />
    <span>{text}</span>
  </Typography.Text>
)

export default HelperText
