/**
 * 告诉 TypeScript 如何处理 .wasm?init 导入。
 * 这些导入会返回一个 init 函数，该函数返回一个 Promise，
 * 解析为包含 WebAssembly 模块导出函数的对象。
 */
declare module '*.wasm?init' {
    // 定义WASM模块导出的函数和属性的接口
    interface WasmInstanceExports {
        memory: WebAssembly.Memory; // wasm-bindgen 通常会导出 memory
        bindgen_process_text: (inputText: string) => string;
        bindgen_process_json: (jsonInput: string) => string;
        // 如果您的WASM模块还有其他导出，请在此处添加它们
    }

    const initWasm: () => Promise<WasmInstanceExports>;
    export default initWasm;
}