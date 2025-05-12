import React, { useState, useEffect } from 'react';
import './WasmBindgenExample.css';

/**
 * WasmBindgenExample组件
 * 与Rust通过wasm-bindgen进行交互的示例组件
 */
const WasmBindgenExample: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [jsonInput, setJsonInput] = useState('{"name": "example", "value": "test"}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [wasmModule, setWasmModule] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState('初始化中...');
  const [message] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * 加载并初始化WebAssembly模块
   * 这个函数负责动态加载和初始化WASM模块
   * @returns {Promise<void>}
   */
  const loadWasmModule = async () => {
    try {
      setIsLoading(true);
      setWasmLoaded(false);
      setWasmModule(null);
      setLoadingStatus('正在初始化 WebAssembly 模块...');
      
      // 使用动态导入并添加 ?url 查询参数
      const wasmUrl = '/wasm/car_hello_world.js?url';
      const wasmModule = await import(/* @vite-ignore */ wasmUrl);
      await wasmModule.default();
      
      const instance = { 
        bindgen_process_text: wasmModule.bindgen_process_text, 
        bindgen_process_json: wasmModule.bindgen_process_json 
      };
      
      if (typeof instance.bindgen_process_text !== 'function' || 
          typeof instance.bindgen_process_json !== 'function') {
        console.error('Wasm instance:', instance);
        throw new Error('所需的函数 (bindgen_process_text, bindgen_process_json) 未在WASM模块实例中找到。');
      }
  
      setWasmModule(instance); 
      setWasmLoaded(true);
      setErrorMessage('');
      setLoadingStatus('WebAssembly 模块加载成功!');
    } catch (error: any) {
      console.error('加载WebAssembly模块失败:', error);
      setWasmLoaded(false);
      setWasmModule(null);
      setErrorMessage(`加载WebAssembly模块失败: ${error.message || String(error)}`);
      setLoadingStatus(`错误: ${error.message || String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 加载WebAssembly模块 - 初始加载
   * 使用动态导入方式加载WASM模块，并确保正确初始化
   */
  useEffect(() => {
    const initWasm = async () => {
      try {
        setIsLoading(true);
        
        // 使用 script 标签加载 WASM 模块
        const script = document.createElement('script');
        script.type = 'module';
        script.src = '/wasm/car_hello_world.js';
        
        // 等待脚本加载完成
        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('加载WASM模块脚本失败'));
          document.head.appendChild(script);
        });
  
        // 等待一小段时间确保模块完全加载
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // 获取全局导出的wasm模块
        const wasmModule = (window as any).__wasm_bindgen;  // 注意这里使用 __wasm_bindgen
        if (!wasmModule) {
          throw new Error('WASM模块未能正确加载到全局作用域');
        }
  
        // 初始化WASM模块
        await wasmModule();
        
        // 获取导出的函数
        const instance = {
          bindgen_process_text: wasmModule.bindgen_process_text,
          bindgen_process_json: wasmModule.bindgen_process_json
        };
  
        // 验证函数是否存在
        if (typeof instance.bindgen_process_text !== 'function' || 
            typeof instance.bindgen_process_json !== 'function') {
          console.log('可用的函数:', Object.keys(wasmModule));
          throw new Error('WASM模块中缺少必要的函数');
        }
  
        setWasmModule(instance);
        setWasmLoaded(true);
        setErrorMessage('');
        setLoadingStatus('WebAssembly 模块加载成功!');
      } catch (error: any) {
        console.error('加载WebAssembly模块失败:', error);
        setWasmLoaded(false);
        setWasmModule(null);
        setErrorMessage(`加载WebAssembly模块失败: ${error.message || '未知错误'}`);
        setLoadingStatus(`错误: ${error.message || '未知错误'}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    initWasm();
  }, []);

  /**
   * 处理文本输入并通过WebAssembly处理
   */
  const handleProcessText = () => {
    if (!wasmLoaded || !wasmModule) {
      setErrorMessage('WebAssembly模块未加载，无法处理输入');
      return;
    }

    try {
      console.log('调用bindgen_process_text函数');
      // 检查函数是否存在
      if (typeof wasmModule.bindgen_process_text !== 'function') {
        console.error('bindgen_process_text函数未找到，可用函数：', Object.keys(wasmModule));
        setErrorMessage('函数bindgen_process_text未找到');
        return;
      }
      
      // 调用Rust的bindgen_process_text函数
      const result = wasmModule.bindgen_process_text(inputText);
      console.log('处理结果:', result);
      setOutputText(result);
      setErrorMessage('');
    } catch (error) {
      console.error('处理输入时出错:', error);
      setErrorMessage(`处理输入时出错: ${error}`);
    }
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
      console.log('调用bindgen_process_json函数');
      // 检查函数是否存在
      if (typeof wasmModule.bindgen_process_json !== 'function') {
        console.error('bindgen_process_json函数未找到，可用函数：', Object.keys(wasmModule));
        setErrorMessage('函数bindgen_process_json未找到');
        return;
      }
      
      // 验证JSON格式
      JSON.parse(jsonInput);
      
      // 调用Rust的bindgen_process_json函数
      const result = wasmModule.bindgen_process_json(jsonInput);
      console.log('处理结果:', result);
      setJsonOutput(result);
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
    navigator.clipboard.writeText('cd rust && wasm-pack build --target web --out-dir ../web/public/wasm')
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  };
  
  /**
   * 手动重新加载WebAssembly模块
   */
  const handleReloadWasm = async () => {
    try {
      setIsLoading(true);
      setWasmLoaded(false);
      setWasmModule(null);
      setLoadingStatus('正在重新加载 WebAssembly 模块...');
      
      // 使用script标签加载WASM模块
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/wasm/car_hello_world.js';
      
      // 等待脚本加载完成
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('加载WASM模块脚本失败'));
        document.head.appendChild(script);
      });
  
      // 等待一小段时间确保模块完全加载
      await new Promise(resolve => setTimeout(resolve, 200));
  
      // 获取全局导出的wasm模块
      const wasmModule = (window as any).wasm_bindgen;
      if (!wasmModule) {
        throw new Error('WASM模块未能正确加载到全局作用域');
      }
  
      // 初始化WASM模块
      await wasmModule();
  
      // 获取导出的函数
      const instance = {
        bindgen_process_text: wasmModule.bindgen_process_text,
        bindgen_process_json: wasmModule.bindgen_process_json
      };
  
      // 验证函数是否存在
      if (typeof instance.bindgen_process_text !== 'function' || 
          typeof instance.bindgen_process_json !== 'function') {
        console.log('可用的函数:', Object.keys(wasmModule));
        throw new Error('WASM模块中缺少必要的函数');
      }
  
      setWasmModule(instance);
      setWasmLoaded(true);
      setErrorMessage('');
      setLoadingStatus('WebAssembly 模块加载成功!');
    } catch (error: any) {
      console.error('加载WebAssembly模块失败:', error);
      setWasmLoaded(false);
      setWasmModule(null);
      setErrorMessage(`加载WebAssembly模块失败: ${error.message || '未知错误'}`);
      setLoadingStatus(`错误: ${error.message || '未知错误'}`);
    } finally {
      setIsLoading(false);
    }
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
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default WasmBindgenExample;