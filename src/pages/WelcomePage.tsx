import { Button, Col, Image, Row, Typography } from 'antd'
import bigImage from '../assets/image-removebg-preview.png'
import { useNavigate } from 'react-router-dom'

const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <Row>
      <Col span={12}>
        <Typography.Title level={1}>
          Вітаємо!
          <br />
          Ви можете створити нове опитування або вибрати одне з існуючих
        </Typography.Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button
            type="primary"
            onClick={() => navigate('/create')}
            size="large"
            style={{ width: '100%' }}
          >
            Створити нове опитування
          </Button>
          <Button
            type="default"
            onClick={() => navigate('/demo')}
            size="large"
            style={{ width: '100%' }}
          >
            Вибрати існуюче опитування
          </Button>
        </div>
      </Col>
      <Col span={12}>
        <Image src={bigImage} preview={false} height={300} />
      </Col>
    </Row>
  )
}

export default WelcomePage
