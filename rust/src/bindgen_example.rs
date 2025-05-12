//! WebAssembly bindgen 模块
//! 
//! 这个模块提供了通过 wasm-bindgen 导出到 JavaScript 的函数

use wasm_bindgen::prelude::*;
use serde_json::{Value, Map};

/// 处理用户文本输入并返回处理后的字符串
/// 
/// # 参数
/// 
/// * `input` - 用户输入的字符串
/// 
/// # 返回值
/// 
/// 返回处理后的字符串
#[wasm_bindgen]
pub fn bindgen_process_text(input: &str) -> String {
    if input.is_empty() {
        return String::from("请输入一些文本");
    }

    format!("Rust通过wasm-bindgen处理后的消息: {}", input)
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
#[wasm_bindgen]
pub fn bindgen_process_json(input: &str) -> Result<String, JsValue> {
    if input.is_empty() {
        return Ok(String::from("请输入JSON数据"));
    }

    // 解析JSON
    let json: Value = match serde_json::from_str(input) {
        Ok(v) => v,
        Err(e) => {
            return Err(JsValue::from_str(&format!("JSON解析错误: {}", e)));
        }
    };
    
    // 处理JSON数据
    let result = match json {
        Value::Object(obj) => {
            let mut result = Map::new();
            for (key, value) in obj {
                // 示例：将所有字符串值转换为大写，并添加一个处理标记
                let processed_value = match value {
                    Value::String(s) => Value::String(s.to_uppercase()),
                    Value::Number(ref n) => {
                        if let Some(num) = n.as_f64() {
                            Value::Number(serde_json::Number::from_f64(num * 2.0).unwrap_or(n.clone()))
                        } else {
                            value
                        }
                    },
                    _ => value,
                };
                result.insert(key, processed_value);
            }
            // 添加处理标记
            result.insert("processed_by".to_string(), Value::String("wasm-bindgen".to_string()));
            Value::Object(result)
        }
        _ => {
            // 如果不是对象，则包装在一个对象中
            let mut result = Map::new();
            result.insert("value".to_string(), json);
            result.insert("processed_by".to_string(), Value::String("wasm-bindgen".to_string()));
            Value::Object(result)
        }
    };

    // 将结果转换回JSON字符串
    match serde_json::to_string(&result) {
        Ok(s) => Ok(s),
        Err(e) => Err(JsValue::from_str(&format!("JSON序列化错误: {}", e))),
    }
}

/// 计算斐波那契数列第n项
/// 
/// # 参数
/// 
/// * `n` - 需要计算的斐波那契数列项
/// 
/// # 返回值
/// 
/// 返回斐波那契数列第n项的值
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let mut a = 0;
            let mut b = 1;
            for _ in 2..=n {
                let c = a + b;
                a = b;
                b = c;
            }
            b
        }
    }
}

/// 对数组中的所有元素进行求和
/// 
/// # 参数
/// 
/// * `values` - 需要求和的数组
/// 
/// # 返回值
/// 
/// 返回数组元素的总和
#[wasm_bindgen]
pub fn sum_array(values: &[i32]) -> i32 {
    values.iter().sum()
} 