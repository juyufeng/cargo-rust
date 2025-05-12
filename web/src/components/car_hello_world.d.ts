/**
 * 为 wasm-bindgen 生成的 WebAssembly 模块定义类型声明
 * 这个文件帮助 TypeScript 理解 WASM 模块的结构和导出的函数
 */
declare module '/wasm/car_hello_world.js' {
    /**
     * WASM 模块导出的函数和属性的接口定义
     */
    interface WasmBindgenExports {
        // wasm-bindgen 通常会导出的内存对象
        memory: WebAssembly.Memory;
        
        // 文本处理函数
        bindgen_process_text: (inputText: string) => string;
        
        // JSON 处理函数
        bindgen_process_json: (jsonInput: string) => string;
        
        // 默认初始化函数
        default: () => Promise<void>;
        
        // 如果有其他导出的函数，可以在这里添加
    }

    /**
     * 模块导出声明
     */
    const exports: WasmBindgenExports;
    export default exports;
}

/**
 * 为带有 URL 查询参数的导入定义类型
 */
declare module '/wasm/car_hello_world.js?url' {
    export * from '/wasm/car_hello_world.js';
}