import React, { useState } from 'react';
import './WasmComponent.css';

/**
 * WasmComponent组件
 * 临时版本 - 不依赖于WebAssembly插件
 */
const WasmComponent: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  
  /**
   * 复制命令到剪贴板
   */
  const copyCommand = () => {
    navigator.clipboard.writeText('cd rust && cargo build --target wasm32-wasi')
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
      <h2 className="component-title">Extism 插件演示 (WASI)</h2>
      
      <div className="section info-section">
        <h3>正在准备中...</h3>
        <p>WebAssembly插件正在配置中，稍后将提供完整功能。</p>
        <div className="construction-message">
          <p>如需完整功能，请先编译Rust插件并将构建的wasm文件放置在正确位置。</p>
          <div className="code-container">
            <pre onClick={copyCommand}>cd rust && cargo build --target wasm32-wasi</pre>
            {copySuccess && <div className="copy-tooltip">已复制!</div>}
          </div>
          <p>然后将编译好的文件复制到web/public/wasm/目录。</p>
        </div>
      </div>
    </div>
  );
};

export default WasmComponent;