use wasm_bindgen::prelude::*;

/**
 * User 结构体
 * 注意：为了与 JavaScript 交互，我们使用 getter/setter 方法来访问字段
 * 而不是直接暴露字段
 */
#[wasm_bindgen]
pub struct User {
    name: String,
    age: u32,
    email: String,
}

#[wasm_bindgen]
impl User {
    /**
     * 创建新的 User 实例
     * @param name - 用户名
     * @param age - 年龄
     * @param email - 邮箱地址
     * @returns User 实例
     */
    #[wasm_bindgen(constructor)]
    pub fn new(name: String, age: u32, email: String) -> User {
        User { name, age, email }
    }

    /**
     * 获取用户名
     * @returns 用户名字符串
     */
    #[wasm_bindgen(getter)]
    pub fn name(&self) -> String {
        self.name.clone()
    }

    /**
     * 设置用户名
     * @param name - 新的用户名
     */
    #[wasm_bindgen(setter)]
    pub fn set_name(&mut self, name: String) {
        self.name = name;
    }

    /**
     * 获取邮箱地址
     * @returns 邮箱地址字符串
     */
    #[wasm_bindgen(getter)]
    pub fn email(&self) -> String {
        self.email.clone()
    }

    /**
     * 设置邮箱地址
     * @param email - 新的邮箱地址
     */
    #[wasm_bindgen(setter)]
    pub fn set_email(&mut self, email: String) {
        self.email = email;
    }

    /**
     * 获取年龄
     * @returns 年龄数值
     */
    #[wasm_bindgen(getter)]
    pub fn age(&self) -> u32 {
        self.age
    }

    /**
     * 设置年龄
     * @param age - 新的年龄值
     */
    #[wasm_bindgen(setter)]
    pub fn set_age(&mut self, age: u32) {
        self.age = age;
    }

    /**
     * 生成问候语
     * @returns 包含用户信息的问候语字符串
     */
    pub fn greet(&self) -> String {
        format!("Hello, {}! You are {} years old.", self.name, self.age)
    }
}

/**
 * 处理文本数据
 * @param text - 输入的文本字符串
 * @returns 处理后的文本
 */
#[wasm_bindgen]
pub fn bindgen_process_text(text: String) -> String {
    format!("Processed text: {}", text)
}

/**
 * 处理 JSON 数据
 * @param json - 输入的 JSON 字符串
 * @returns 处理后的 JSON
 */
#[wasm_bindgen]
pub fn bindgen_process_json(json: String) -> String {
    format!("Processed JSON: {}", json)
}