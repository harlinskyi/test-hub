import { Button, Col, Image, Layout, Row, Space, theme, Typography } from 'antd'
import { useState } from 'react'
import './App.css'
import bigImage from './assets/image-removebg-preview.png'
import logo from './assets/logo.png'
import QuestionsConfiguration from './pages/QuestionsConfiguration'

const { Header, Content, Footer } = Layout

function App() {
  const [mode, setMode] = useState<'demo' | 'new'>()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const renderCreateMode = () => {
    return <QuestionsConfiguration />
  }

  const renderWelcomeMode = () => {
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
              onClick={() => setMode('new')}
              size="large"
              style={{ width: '100%' }}
            >
              Створити нове опитування
            </Button>
            <Button
              type="default"
              onClick={() => setMode('demo')}
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

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: '#1e2d50' }} className="header">
        <Row>
          <Col>
            <Image src={logo} preview={false} height={30} />
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          padding: 48,
          height: '100%',
          margin: '24px auto',
          maxWidth: 1200,
        }}
        className="content"
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {/* <Sider style={{ background: colorBgContainer }} width={200}>
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
          </Sider> */}
            {!mode && renderWelcomeMode()}
            {mode === 'new' && renderCreateMode()}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }} className="footer">
        Harlinskyi Kyrylo ©2024 КН-2/1
      </Footer>
    </Layout>
  )
}

export default App
