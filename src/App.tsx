import { Col, Flex, Image, Layout, Row, theme } from 'antd'
import logo from './assets/logo_IT_short_white.png'
import { Router } from './routes/Router'

const { Header, Content, Footer } = Layout

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: '#1e2d50' }} className="header">
        <Row>
          <Col>
            <Flex align="center" gap={10} dir="row">
              <span>
                <Image src={logo} preview={false} height={30} />
              </span>{' '}
              <span style={{ color: '#fff', fontWeight: 'bold' }}>
                {' | Harlinskyi Kyrylo - КН-2/1'}
              </span>
            </Flex>
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          padding: 48,
          height: '100%',
          margin: '24px auto',
          maxWidth: 1200,
          width: '100%',
        }}
        className="content"
      >
        <Layout
          style={{
            padding: '24px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow:
              '0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)',
          }}
        >
          <Router />
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }} className="footer">
        Harlinskyi Kyrylo ©2024 КН-2/1
      </Footer>
    </Layout>
  )
}

export default App
