import { useState, useEffect } from 'react';
// 修改导入路径，确保指向正确的文件位置
import init, { bindgen_process_text, bindgen_process_json } from '../../public/wasm/car_hello_world.js';
/**
 * WASM模块接口定义
 * @description 定义了WASM模块必须实现的函数接口
 */
export interface WasmModule {
  bindgen_process_text: (text: string) => string;
  bindgen_process_json: (json: string) => string;
}

/**
 * WASM模块加载状态接口
 * @description 定义了WASM模块加载过程中的状态信息
 */
export interface WasmModuleState {
  wasmLoaded: boolean;
  wasmModule: WasmModule | null;
  errorMessage: string;
  loadingStatus: string;
  isLoading: boolean;
}

/**
 * WASM模块加载Hook返回值接口
 * @description 定义了Hook返回的所有状态和方法
 */
export interface WasmModuleHookReturn extends WasmModuleState {
  loadWasmModule: () => Promise<void>;
  setErrorMessage: (message: string) => void;
}

/**
 * WASM模块加载Hook
 * @description 封装了WASM模块的加载、初始化和状态管理逻辑
 * @returns {WasmModuleHookReturn} 返回WASM模块的状态和控制函数
 */
export const useWasmModule = (): WasmModuleHookReturn => {
  const [state, setState] = useState<WasmModuleState>({
    wasmLoaded: false,
    wasmModule: null,
    errorMessage: '',
    loadingStatus: '初始化中...',
    isLoading: true
  });

  /**
   * 更新模块状态
   * @param updates 需要更新的状态字段
   */
  const updateState = (updates: Partial<WasmModuleState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  /**
   * 加载WASM模块
   * @description 负责加载和初始化WASM模块，处理加载过程中的错误
   */
  const loadWasmModule = async () => {
    try {
      updateState({
        isLoading: true,
        wasmLoaded: false,
        wasmModule: null,
        loadingStatus: '正在初始化 WebAssembly 模块...'
      });
      
      // 初始化WASM模块
      await init();
      
      // 直接使用导入的函数，它们已经被胶水代码包装成正确的类型
      const instance = {
        bindgen_process_text,
        bindgen_process_json
      };
  
      if (typeof bindgen_process_text !== 'function' || 
          typeof bindgen_process_json !== 'function') {
        console.log('可用的导出:', { bindgen_process_text, bindgen_process_json });
        throw new Error('WASM模块中缺少必要的函数');
      }
  
      updateState({
        wasmModule: instance,
        wasmLoaded: true,
        errorMessage: '',
        loadingStatus: 'WebAssembly 模块加载成功!'
      });
    } catch (error: any) {
      console.error('加载WebAssembly模块失败:', error);
      // 添加更详细的错误信息
      const errorMessage = error instanceof WebAssembly.CompileError 
        ? '无法编译WebAssembly模块，请确保文件格式正确'
        : error.message || '未知错误';
        
      updateState({
        wasmLoaded: false,
        wasmModule: null,
        errorMessage: `加载WebAssembly模块失败: ${errorMessage}`,
        loadingStatus: `错误: ${errorMessage}`
      });
    } finally {
      updateState({ isLoading: false });
    }
  };

  // 初始加载
  useEffect(() => {
    loadWasmModule();
  }, []);

  /**
   * 设置错误信息
   * @param message 错误信息
   */
  const setErrorMessage = (message: string) => {
    updateState({ errorMessage: message });
  };

  return {
    ...state,
    loadWasmModule,
    setErrorMessage
  };
};