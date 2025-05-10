# Car Hello World

这是一个基于Extism框架的Rust WebAssembly插件示例项目，展示了如何在React19 + Electron环境中集成和使用WebAssembly模块。

## 项目特点

- 使用Rust编写WebAssembly插件
- 基于Extism框架开发
- React19 + Electron前端集成
- 本地CPU执行，无远程调用
- 支持动态加载Wasm模块

## 项目结构

```
cargo-rust/
├── rust/                    # Rust插件代码
│   ├── src/
│   │   └── lib.rs          # Rust插件源码
│   └── Cargo.toml          # Rust项目配置
│
├── web/                     # React调试环境
│   ├── src/
│   │   ├── components/     # React组件
│   │   │   └── WasmComponent.tsx
│   │   ├── main.ts         # Electron主进程
│   │   └── index.tsx       # React入口
│   └── public/
│       └── wasm/          # Wasm文件存放目录
```

## 环境要求

- Rust工具链（包含cargo）
- Node.js 18+
- wasm32-wasi目标支持

## 安装步骤

1. 添加wasm32-wasi目标：
```bash
rustup target add wasm32-wasi
```

2. 安装项目依赖：
```bash
cd web
npm install
```

## 构建说明

1. 构建Wasm模块：
```bash
cd web
npm run build:wasm
```
生成的Wasm文件位于 `web/public/wasm/car_hello_world.wasm`

2. 构建前端应用：
```bash
cd web
npm run build
```

## 开发模式

1. 启动开发服务器：
```bash
cd web
npm run dev
```

2. 在新终端启动Electron：
```bash
cd web
npm start
```

## 使用说明

1. 构建Wasm模块后，将生成的`car_hello_world.wasm`文件上传到OSS或其他可访问的位置
2. 在`WasmComponent.tsx`中更新Wasm文件的URL
3. 启动应用程序，查看WebAssembly模块的执行结果

## 注意事项

- 确保Wasm文件的URL可以正常访问
- 开发模式下需要同时运行开发服务器和Electron
- 生产环境部署前需要更新Wasm文件的实际URL

## CI/CD

项目包含GitHub Actions配置，可以自动执行以下任务：

- 构建Wasm模块
- 构建前端应用
- 上传构建产物

## 许可证

MIT