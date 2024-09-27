import { ConfigProvider, ThemeConfig } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const primaryColor = '#4c08bd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,
    colorInfo: primaryColor,
    colorBgBase: '#f5f5f5',
  },
  components: {
    Card: {
      headerBg: primaryColor,
      colorTextHeading: '#fff',
      extraColor: '#fff',
      colorBorderSecondary: '#b9a7d6',
    },
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </StrictMode>
)
