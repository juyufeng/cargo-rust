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

        console.log('开始加载Wasm文件...');
        // 从public目录加载Wasm文件
        const response = await fetch('/wasm/car_hello_world.wasm');
        console.log('Wasm文件响应状态:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to load WASM file: ${response.statusText}`);
        }
        const wasmBuffer = await response.arrayBuffer();
        console.log('Wasm文件大小:', wasmBuffer.byteLength, 'bytes');

        console.log('创建插件实例...');
        // 创建插件实例
        const plugin: Plugin = await createPlugin(wasmBuffer, {
          useWasi: true, // 启用WASI支持
        });
        console.log('插件实例创建成功');

        console.log('调用插件函数...');
        // 调用插件的hello_world函数
        const result = await plugin.call('hello_world');
        console.log('插件调用结果:', result);
        
        if (!result) {
          throw new Error('Plugin call returned no result');
        }

        // 正确处理插件返回的结果
        const resultBuffer = result.buffer;
        if (!resultBuffer) {
          throw new Error('Plugin result buffer is empty');
        }

        // 使用TextDecoder解码结果
        const text = new TextDecoder().decode(resultBuffer);
        console.log('解码后的消息:', text);
        
        if (!text) {
          throw new Error('Decoded message is empty');
        }
        
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