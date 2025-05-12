import React, { useState, useEffect } from 'react';
import { createPlugin, Plugin } from '@extism/extism';
import './WasmComponent.css';

/**
 * WasmComponent组件
 * 用于加载和执行WebAssembly插件
 */
const WasmComponent: React.FC = () => {
  // 状态管理
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  const [input, setInput] = useState<string>('');
  const [jsonInput, setJsonInput] = useState<string>('{"name": "test", "value": "hello"}');

  useEffect(() => {
    // 加载并初始化Wasm插件
    const loadWasm = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('开始加载Wasm文件...');
        const response = await fetch('/wasm/car_hello_world.wasm', {
          headers: {
            'Content-Type': 'application/wasm'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load WASM file: ${response.statusText}`);
        }
        const wasmBuffer = await response.arrayBuffer();

        const pluginInstance: Plugin = await createPlugin(wasmBuffer, {
          useWasi: true,
        });
        setPlugin(pluginInstance);

        const result: any = await pluginInstance.call('hello_world');
        if (!result) {
          throw new Error('Plugin call returned no result');
        }

        const text = new TextDecoder().decode(result);
        console.log('Rust返回的消息 (直接解码):', text);
        setMessage(text || '无返回消息');
      } catch (err: any) {
        console.error('WASM加载错误:', err);
        setError(err.message || '加载WebAssembly模块时发生错误');
      } finally {
        setLoading(false);
      }
    };

    loadWasm();
  }, []);

  // 处理文本输入
  const handleProcessInput = async () => {
    if (!plugin) {
      setError('插件未加载');
      return;
    }

    try {
      console.log('发送到Rust的文本:', input);
      const result: any = await plugin.call('process_input', input);
      console.log('Rust返回的原始结果:', result);
      
      if (!result) {
        throw new Error('Plugin call returned no result');
      }

      const text = new TextDecoder().decode(result);
      console.log('解码后的消息 (直接解码):', text);
      setMessage(text || '无返回消息');
    } catch (err: any) {
      console.error('处理输入时发生错误:', err);
      setError(err.message || '处理输入时发生错误');
    }
  };

  // 处理JSON输入
  const handleProcessJson = async () => {
    if (!plugin) {
      setError('插件未加载');
      return;
    }

    try {
      console.log('发送到Rust的JSON:', jsonInput);
      const result: any = await plugin.call('process_json', jsonInput);
      console.log('Rust返回的原始结果:', result);
      
      if (!result) {
        throw new Error('Plugin call returned no result');
      }

      const text = new TextDecoder().decode(result);
      console.log('解码后的JSON (直接解码):', text);
      setMessage(text || '无返回消息');
    } catch (err: any) {
      console.error('处理JSON时发生错误:', err);
      setError(err.message || '处理JSON时发生错误');
    }
  };

  if (loading) {
    return <div className="wasm-container">加载中...</div>;
  }

  if (error) {
    return (
      <div className="wasm-container">
        <h2>错误</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="wasm-container">
      <div className="section">
        <h2>Rust → JavaScript</h2>
        <div className="result-box">
          <h3>Rust返回的消息</h3>
          <p className="message">{message}</p>
        </div>
      </div>

      <div className="section">
        <h2>JavaScript → Rust</h2>
        <div className="input-group">
          <h3>文本处理</h3>
          <div className="input-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入要发送到Rust的文本"
            />
            <button onClick={handleProcessInput}>发送到Rust</button>
          </div>
        </div>

        <div className="input-group">
          <h3>JSON处理(将所有字符串值转换为大写)</h3>
          <div className="input-box">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="输入要发送到Rust的JSON"
            />
            <button onClick={handleProcessJson}>发送到Rust</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasmComponent;