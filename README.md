# 🚀 Rust + React WebAssembly 演示项目

## 预览

![预览](https://github.com/juyufeng/cargo-rust/blob/master/product.png)

<div align="center">

![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

## ✨ 项目简介

这是一个展示 Rust 与 WebAssembly 在 Web 开发中强大能力的现代化演示项目。通过结合 Rust 的高性能与 React 的灵活性，我们创建了一个既快速又用户友好的 Web 应用。

## 🌟 主要特性

- 🚀 **高性能计算**：利用 Rust 和 WebAssembly 实现接近原生的性能
- 🎨 **现代化 UI**：采用 React + TypeScript 构建响应式用户界面
- 🔌 **双重 WebAssembly 集成**：
  - 使用 `wasm-bindgen` 实现 Rust 与 JavaScript 的无缝交互
  - 通过 `extism` 支持 WASI 插件系统
- 📱 **响应式设计**：完美适配各种设备尺寸
- 🎯 **类型安全**：全程 TypeScript 支持，提供更好的开发体验

## 🛠️ 技术栈

### 前端
- React 18
- TypeScript
- Vite
- React Router
- Modern CSS

### Rust & WebAssembly
- Rust 2021
- wasm-bindgen
- extism-pdk
- wasm-pack

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- Rust >= 1.70.0
- wasm-pack
- cargo-wasi

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/yourusername/rust-react-wasm-demo.git
cd rust-react-wasm-demo
```

2. **安装依赖**
```bash
# 安装前端依赖
cd web
npm install

# 安装 Rust 依赖
cd ../rust
cargo build
```

3. **构建 WebAssembly 模块**
```bash
# 构建 wasm-bindgen 模块
wasm-pack build --target web

# 构建 WASI 模块
cargo build --target wasm32-wasi
```

4. **启动开发服务器**
```bash
cd ../web
npm run dev
```

## 📦 项目结构

```
.
├── web/                 # 前端项目目录
│   ├── src/            # 源代码
│   ├── public/         # 静态资源
│   └── package.json    # 前端依赖配置
│
└── rust/               # Rust 项目目录
    ├── src/            # Rust 源代码
    └── Cargo.toml      # Rust 依赖配置
```

## 🎯 功能演示

### 1. wasm-bindgen 演示
- 用户信息处理
- 斐波那契数列计算
- 字符串处理
- 数组操作

### 2. Extism WASI 插件演示
- 文本处理
- JSON 数据转换
- 高性能计算

## 🔧 开发指南

### 添加新的 Rust 函数

1. 在 `rust/src/lib.rs` 中添加新函数
2. 使用 `#[wasm_bindgen]` 标记需要导出的函数
3. 重新构建 WebAssembly 模块
4. 在前端组件中导入并使用

### 创建新的 WASI 插件

1. 在 `rust/src/` 下创建新的插件文件
2. 实现插件接口
3. 使用 `cargo build --target wasm32-wasi` 构建
4. 将生成的 .wasm 文件放入 `web/public/wasm/` 目录

## 📝 贡献指南

欢迎提交 Pull Request 或创建 Issue！在提交之前，请确保：

1. 代码符合项目规范
2. 添加了必要的测试
3. 更新了相关文档

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 👥 作者

- 您的名字 - [@yourusername](https://github.com/yourusername)

## 🙏 致谢

- [Rust 团队](https://www.rust-lang.org/)
- [WebAssembly](https://webassembly.org/)
- [React 团队](https://reactjs.org/)
- [Extism](https://extism.org/)