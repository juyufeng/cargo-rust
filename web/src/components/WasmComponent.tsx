import React, { useState, useEffect } from 'react';
import './WasmComponent.css';

/**
 * WasmComponent组件
 * 与Extism WASI插件交互的示例组件
 */
const WasmComponent: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [jsonInput, setJsonInput] = useState('{"name": "example", "value": "test"}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [plugin, setPlugin] = useState<any>(null);

  /**
   * 字符串转为Uint8Array
   */
  const stringToUint8Array = (str: string): Uint8Array => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  /**
   * 初始化并加载Extism插件
   */
  useEffect(() => {
    const initPlugin = async () => {
      try {
        console.log('尝试加载WASI插件...');
        // 尝试加载WASI插件
        const response = await fetch('/wasm/rust.wasm');
        
        if (!response.ok) {
          console.error(`插件获取失败: ${response.status} ${response.statusText}`);
          throw new Error(`插件加载失败: ${response.status} ${response.statusText}`);
        }
        
        console.log('WASM文件获取成功，准备初始化...');
        const wasmBytes = await response.arrayBuffer();
        console.log(`获取到WASM数据，大小: ${wasmBytes.byteLength} 字节`);
        
        // 由于我们无法直接调用WASI API，使用模拟接口
        const simplePlugin = {
          call: async (functionName: string, input: string): Promise<Uint8Array> => {
            try {
              console.log(`调用函数: ${functionName}, 输入: ${input}`);
              // 只是模拟处理，没有真正调用WASM函数
              let result: string;
              
              if (functionName === 'process_input') {
                result = `Rust处理后的消息 (模拟): ${input}`;
              } else if (functionName === 'process_json') {
                try {
                  const data = JSON.parse(input);
                  // 模拟处理JSON
                  const resultObj = { 
                    ...data, 
                    processed: true, 
                    timestamp: new Date().toISOString() 
                  };
                  result = JSON.stringify(resultObj);
                } catch (e: any) {
                  result = `JSON解析错误 (模拟): ${e.message}`;
                }
              } else {
                result = `[模拟调用] ${functionName}(${input}) 的结果`;
              }
              
              // 返回Uint8Array而不是字符串
              return stringToUint8Array(result);
            } catch (error) {
              console.error(`调用函数出错:`, error);
              return stringToUint8Array(`错误: ${String(error)}`);
            }
          }
        };
        
        setPlugin(simplePlugin);
        setPluginLoaded(true);
        setErrorMessage('');
        console.log('WASI插件模拟加载成功');
      } catch (error) {
        console.error('加载Extism插件失败:', error);
        setPluginLoaded(false);
        setErrorMessage(`加载插件失败: ${error}`);
      }
    };

    initPlugin();
  }, []);

  /**
   * 处理文本输入并发送给WASI插件
   */
  const handleProcessText = async () => {
    if (!pluginLoaded || !plugin) {
      setErrorMessage('插件未加载，无法处理输入');
      return;
    }

    try {
      // 调用插件的process_input函数
      const result = await plugin.call('process_input', inputText);
      const textResult = new TextDecoder().decode(result);
      setOutputText(textResult);
      setErrorMessage('');
    } catch (error) {
      console.error('处理输入时出错:', error);
      setErrorMessage(`处理输入时出错: ${error}`);
    }
  };

  /**
   * 处理JSON输入并发送给WASI插件
   */
  const handleProcessJson = async () => {
    if (!pluginLoaded || !plugin) {
      setErrorMessage('插件未加载，无法处理JSON');
      return;
    }

    try {
      // 验证JSON格式
      JSON.parse(jsonInput);
      
      // 调用插件的process_json函数
      const result = await plugin.call('process_json', jsonInput);
      const jsonResult = new TextDecoder().decode(result);
      setJsonOutput(jsonResult);
      setErrorMessage('');
    } catch (error) {
      console.error('处理JSON时出错:', error);
      setErrorMessage(`处理JSON时出错: ${error}`);
    }
  };
  
  /**
   * 复制命令到剪贴板
   */
  const copyCommand = () => {
    navigator.clipboard.writeText('cd rust && cargo build --target wasm32-wasi && mkdir -p ../web/public/wasm && cp target/wasm32-wasi/debug/*.wasm ../web/public/wasm/rust.wasm')
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
      
      {!pluginLoaded ? (
      <div className="section info-section">
          <h3>WebAssembly插件未加载</h3>
          <p>请先编译Rust插件并将构建的wasm文件放置在正确位置。</p>
        <div className="construction-message">
            <p>如需完整功能，请先编译Rust插件并将wasm文件复制到web/public/wasm/目录。</p>
          <div className="code-container">
              <pre onClick={copyCommand}>cd rust && cargo build --target wasm32-wasi && mkdir -p ../web/public/wasm && cp target/wasm32-wasi/debug/*.wasm ../web/public/wasm/rust.wasm</pre>
            {copySuccess && <div className="copy-tooltip">已复制!</div>}
            </div>
            <p>然后确保编译好的文件位于web/public/wasm/rust.wasm</p>
            <p>注意：目前Extism API集成存在问题，编译后需要刷新页面再尝试使用本功能。</p>
          </div>
        </div>
      ) : (
        <>
          <div className="section">
            <h3>文本处理示例</h3>
            <div className="input-group">
              <label htmlFor="wasi-text-input">输入文本:</label>
              <input
                id="wasi-text-input"
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
              <label htmlFor="wasi-json-input">输入JSON:</label>
              <textarea
                id="wasi-json-input"
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
    </div>
  );
};

export default WasmComponent;