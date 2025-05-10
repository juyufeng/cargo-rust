import React from 'react';
import ReactDOM from 'react-dom/client';
import WasmComponent from '@components/WasmComponent';

/**
 * 应用程序入口
 * 渲染WasmComponent到根DOM节点
 */
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <WasmComponent />
  </React.StrictMode>
);