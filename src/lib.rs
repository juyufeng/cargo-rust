//! car-hello-world Wasm插件
//! 这是一个基于Extism框架的示例插件，用于演示WebAssembly与React+Electron的集成

use extism_pdk::*;

/// 插件的主要函数，返回一个问候消息
/// 
/// # 返回值
/// 
/// 返回一个包含问候语的字符串
#[plugin_fn]
pub fn hello_world() -> FnResult<String> {
    // 返回一个简单的问候消息
    Ok(String::from("Hello, car-hello-world!"))
}