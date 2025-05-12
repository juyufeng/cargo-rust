import React, { useState } from 'react';
import { useWasmModule } from '../hooks/useWasmModule';
import './WasmBindgenExample.css';

/**
 * WasmBindgenExample组件
 * @description 与Rust通过wasm-bindgen进行交互的示例组件
 */
const WasmBindgenExample: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [jsonInput, setJsonInput] = useState('{"name": "example", "value": "test"}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const {
    wasmLoaded,
    wasmModule,
    errorMessage,
    loadingStatus,
    isLoading,
    loadWasmModule,
    setErrorMessage  // 从 hook 中获取 setErrorMessage 函数
  } = useWasmModule();

  /**
   * 处理文本输入并通过WebAssembly处理
   */
  const handleProcessText = () => {
    if (!wasmLoaded || !wasmModule) {
      setErrorMessage('WebAssembly模块未加载，无法处理输入');
      return;
    }

    try {
      const result = wasmModule.bindgen_process_text(inputText);
      setOutputText(result);
    } catch (error) {
      console.error('处理输入时出错:', error);
      setErrorMessage(`处理输入时出错: ${error}`);
    }
  };

  /**
 * 重新加载WebAssembly模块
 * @description 当WebAssembly模块加载失败时，可以通过此函数重新尝试加载
 */
  const handleReloadWasm = () => {
    loadWasmModule();
  };

  /**
   * 处理JSON输入并通过WebAssembly处理
   */
  const handleProcessJson = () => {
    if (!wasmLoaded || !wasmModule) {
      setErrorMessage('WebAssembly模块未加载，无法处理JSON');
      return;
    }

    try {
      JSON.parse(jsonInput); // 验证JSON格式
      const result = wasmModule.bindgen_process_json(jsonInput);
      setJsonOutput(result);
    } catch (error) {
      console.error('处理JSON时出错:', error);
      setErrorMessage(`处理JSON时出错: ${error}`);
    }
  };

  /**
   * 复制命令到剪贴板
   */
  const copyCommand = () => {
    navigator.clipboard.writeText('cd rust && wasm-pack build --target web --out-dir ../web/public/wasm')
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

      {!wasmLoaded ? (
        <div className="section info-section">
          <h3>WebAssembly模块未加载</h3>
          <p>请先编译Rust代码生成WebAssembly模块。</p>
          <div className="loading-status">
            加载状态: {loadingStatus}
          </div>
          <div className="construction-message">
            <p>在rust目录下运行以下命令构建WebAssembly模块:</p>
            <div className="code-container">
              <pre onClick={copyCommand}>cd rust && wasm-pack build --target web --out-dir ../web/public/wasm</pre>
              {copySuccess && <div className="copy-tooltip">已复制!</div>}
            </div>
            <p>构建完成后将生成的文件直接输出到web/public/wasm目录。</p>
            <button className="reload-button" onClick={handleReloadWasm}>
              重新加载WebAssembly模块
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="section">
            <h3>文本处理示例</h3>
            <div className="input-group">
              <label htmlFor="text-input">输入文本:</label>
              <input
                id="text-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="请输入文本..."
              />
              <button onClick={handleProcessText}>处理文本</button>
            </div>
            <div className="output-container">
              <h4>处理结果:</h4>
              <div className="output-text">{outputText || '等待输入...'}</div>
            </div>
          </div>

          <div className="section">
            <h3>JSON处理示例</h3>
            <div className="input-group">
              <label htmlFor="json-input">输入JSON:</label>
              <textarea
                id="json-input"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={5}
                placeholder="请输入JSON..."
              />
              <button onClick={handleProcessJson}>处理JSON</button>
            </div>
            <div className="output-container">
              <h4>处理结果:</h4>
              <pre className="output-json">{jsonOutput || '等待输入...'}</pre>
            </div>
          </div>
        </>
      )}

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {isLoading && <p>正在加载 WebAssembly 模块...</p>}
    </div>
  );
};


export default WasmBindgenExample;

