use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

/// 定义一个可序列化的结构体
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone)]
pub struct User {
    pub name: String,
    pub age: u32,
    pub email: String,
}

/// 实现 User 结构体的方法
#[wasm_bindgen]
impl User {
    /// 创建新用户
    #[wasm_bindgen(constructor)]
    pub fn new(name: String, age: u32, email: String) -> User {
        User { name, age, email }
    }

    /// 获取用户信息
    #[wasm_bindgen]
    pub fn get_info(&self) -> String {
        format!("姓名: {}, 年龄: {}, 邮箱: {}", self.name, self.age, self.email)
    }

    /// 将用户信息转换为JSON
    #[wasm_bindgen]
    pub fn to_json(&self) -> Result<String, JsValue> {
        serde_json::to_string(self)
            .map_err(|e| JsValue::from_str(&format!("序列化错误: {}", e)))
    }

    /// 从JSON创建用户
    #[wasm_bindgen]
    pub fn from_json(json: &str) -> Result<User, JsValue> {
        serde_json::from_str(json)
            .map_err(|e| JsValue::from_str(&format!("反序列化错误: {}", e)))
    }
}

/// 计算斐波那契数列
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    let mut a = 0;
    let mut b = 1;
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    b
}

/// 字符串处理函数
#[wasm_bindgen]
pub fn process_string(input: &str) -> String {
    input.to_uppercase()
}

/// 数组处理函数
#[wasm_bindgen]
pub fn process_array(input: &[f64]) -> Vec<f64> {
    input.iter().map(|x| x * 2.0).collect()
} 