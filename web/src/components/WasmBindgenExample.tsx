import React, { useState } from 'react';
import './WasmBindgenExample.css';

/**
 * WasmBindgenExample组件
 * 临时版本 - 不依赖于WebAssembly模块
 */
const WasmBindgenExample: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  
  /**
   * 复制命令到剪贴板
   */
  const copyCommand = () => {
    navigator.clipboard.writeText('wasm-pack build --target web')
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  };
  
  return (
    <div className="wasm-container">
      <h2 className="component-title">Wasm-Bindgen 插件演示</h2>
      
      <div className="section info-section">
        <h3>正在准备中...</h3>
        <p>WebAssembly模块正在构建中，稍后将提供完整功能。</p>
        <div className="construction-message">
          <p>如需完整功能，请先在rust目录下运行以下命令构建WebAssembly模块:</p>
          <div className="code-container">
            <pre onClick={copyCommand}>wasm-pack build --target web</pre>
            {copySuccess && <div className="copy-tooltip">已复制!</div>}
          </div>
          <p>构建完成后将在rust/pkg目录中生成相应的JavaScript绑定文件。</p>
        </div>
      </div>
    </div>
  );
};

export default WasmBindgenExample; 