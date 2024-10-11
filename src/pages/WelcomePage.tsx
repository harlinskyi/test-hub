import { Button, Col, Image, Row, Typography, Layout } from 'antd'
import bigImage from '../assets/image-removebg-preview.png'
import { useNavigate } from 'react-router-dom'
import { getCreateRoute, getSelectTestRoute } from '../routes/routeConstants'

const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
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
              onClick={() => navigate(getCreateRoute())}
              size="large"
              style={{ width: '100%' }}
            >
              Створити нове опитування
            </Button>
            <Button
              type="default"
              onClick={() => navigate(getSelectTestRoute())}
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
    </Layout.Content>
  )
}

export default WelcomePage
