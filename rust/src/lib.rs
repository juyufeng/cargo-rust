//! car-hello-world Wasm插件
//! 这是一个基于Extism框架的示例插件，用于演示WebAssembly与React+Electron的集成

mod bindgen_example;

use extism_pdk::*;
use serde_json::{Value, Map};

/// 插件的主要函数，返回一个问候消息
/// 
/// # 返回值
/// 
/// 返回一个包含问候语的字符串
#[plugin_fn]
pub fn hello_world() -> FnResult<String> {
    Ok(String::from("Hello from Rust! 这是来自 Rust 的问候消息"))
}

/// 接收用户输入并返回处理后的消息
/// 
/// # 参数
/// 
/// * `input` - 用户输入的字符串
/// 
/// # 返回值
/// 
/// 返回处理后的字符串
#[plugin_fn]
pub fn process_input(input: String) -> FnResult<String> {
    // 记录接收到的输入
    let input_str = format!("收到的输入: {}", input);
    println!("{}", input_str);

    if input.is_empty() {
        return Ok(String::from("请输入一些文本"));
    }

    let result = format!("Rust处理后的消息: {}", input);
    println!("返回结果: {}", result);
    Ok(result)
}

/// 接收JSON格式的输入并返回处理后的JSON
/// 
/// # 参数
/// 
/// * `input` - JSON格式的字符串
/// 
/// # 返回值
/// 
/// 返回处理后的JSON字符串
#[plugin_fn]
pub fn process_json(input: String) -> FnResult<String> {
    // 记录接收到的输入
    let input_str = format!("收到的JSON输入: {}", input);
    println!("{}", input_str);

    if input.is_empty() {
        return Ok(String::from("请输入JSON数据"));
    }

    // 解析JSON
    let json: Value = match serde_json::from_str(&input) {
        Ok(v) => v,
        Err(e) => {
            let error_msg = format!("JSON解析错误: {}", e);
            println!("{}", error_msg);
            return Err(Error::msg(error_msg).into());
        }
    };
    
    // 处理JSON数据
    let result = match json {
        Value::Object(obj) => {
            let mut result = Map::new();
            for (key, value) in obj {
                // 示例：将所有字符串值转换为大写
                let processed_value = match value {
                    Value::String(s) => Value::String(s.to_uppercase()),
                    _ => value,
                };
                result.insert(key, processed_value);
            }
            Value::Object(result)
        }
        _ => json,
    };

    // 将结果转换回JSON字符串
    let output = match serde_json::to_string(&result) {
        Ok(s) => s,
        Err(e) => {
            let error_msg = format!("JSON序列化错误: {}", e);
            println!("{}", error_msg);
            return Err(Error::msg(error_msg).into());
        }
    };
    
    println!("返回结果: {}", output);
    Ok(output)
}