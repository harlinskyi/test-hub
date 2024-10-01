import { Col, Image, Layout, Row, theme } from 'antd'
import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import Router from './routes/Router'
import { useNavigate } from 'react-router-dom'

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
          width: '100%',
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
           <Router />
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
