import React, { useState, useEffect } from 'react';
import { createPlugin, Plugin } from '@extism/extism';

/**
 * WasmComponent组件
 * 用于加载和执行WebAssembly插件
 */
const WasmComponent: React.FC = () => {
  // 状态管理
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 加载并初始化Wasm插件
    const loadWasm = async () => {
      try {
        setLoading(true);
        setError(null);

        // 从public目录加载Wasm文件
        const response = await fetch('/wasm/car_hello_world.wasm');
        if (!response.ok) {
          throw new Error(`Failed to load WASM file: ${response.statusText}`);
        }
        const wasmBuffer = await response.arrayBuffer();

        // 创建插件实例
        const plugin: Plugin = await createPlugin(wasmBuffer, {
          useWasi: true, // 启用WASI支持
        });

        // 调用插件的hello_world函数
        const result = await plugin.call('hello_world');
        if (!result) {
          throw new Error('Plugin call returned no result');
        }

        // 确保result不为null并转换为正确的类型
        const text = new TextDecoder().decode(new Uint8Array(result));
        setMessage(text);
      } catch (err: any) {
        console.error('WASM加载错误:', err);
        setError(err.message || '加载WebAssembly模块时发生错误');
      } finally {
        setLoading(false);
      }
    };

    loadWasm();
  }, []); // 空依赖数组确保效果只运行一次

  // 根据加载状态渲染不同内容
  if (loading) {
    return <div className="wasm-container">加载中...</div>;
  }

  if (error) {
    return (
      <div className="wasm-container">
        <h2>错误</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="wasm-container">
      <h2>WebAssembly插件消息</h2>
      <p>{message}</p>
    </div>
  );
};

export default WasmComponent;