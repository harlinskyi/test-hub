import { ConfigProvider, ThemeConfig } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const theme: ThemeConfig = {
    token: {
        colorPrimary: '#4c08bd',
        colorInfo: '#4c08bd',
        colorBgBase: '#f5f5f5',
    },
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={theme}>
            <App />
        </ConfigProvider>
    </StrictMode>,
);
