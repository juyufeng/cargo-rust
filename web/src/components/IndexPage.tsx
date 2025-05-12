import React from 'react';
import { Link } from 'react-router-dom';
import './IndexPage.css';

/**
 * 索引页面组件
 * 
 * 提供不同WebAssembly插件示例的导航入口
 */
const IndexPage: React.FC = () => {
  return (
    <div className="index-container">
      <div className="header-section">
        <h1>WebAssembly 插件演示系统</h1>
        <div className="subtitle">基于 Rust + WebAssembly 的跨平台解决方案</div>
      </div>
      
      <div className="intro-section">
        <p>本系统展示了两种不同类型的 WebAssembly 插件实现方式，从不同角度演示了 Rust 与 JavaScript 的交互：</p>
      </div>
      
      <div className="cards-container">
        <div className="card">
          <div className="card-badge">适合服务端/插件场景</div>
          <div className="card-header">
            <div className="card-icon wasi-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 14.5V19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 14.5V19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Extism 插件</h2>
            <span className="tag">WASI</span>
          </div>
          <div className="card-body">
            <p>基于 Extism 框架的 WASI 插件，适合服务端/插件隔离场景。通过宿主环境加载和执行，安全性较高。</p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>文本处理功能</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>JSON 数据转换</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>基于插件系统的隔离执行</span>
              </div>
            </div>
            <div className="tech-stack">
              <span className="tech-badge">Rust</span>
              <span className="tech-badge">Extism PDK</span>
              <span className="tech-badge">WASI</span>
            </div>
          </div>
          <div className="card-footer">
            <Link to="/extism" className="card-button">查看演示</Link>
          </div>
        </div>
        
        <div className="card">
          <div className="card-badge">适合浏览器/前端场景</div>
          <div className="card-header">
            <div className="card-icon bindgen-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 5C21 6.65685 19.6569 8 18 8C16.3431 8 15 6.65685 15 5C15 3.34315 16.3431 2 18 2C19.6569 2 21 3.34315 21 5Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 19C9 20.6569 7.65685 22 6 22C4.34315 22 3 20.6569 3 19C3 17.3431 4.34315 16 6 16C7.65685 16 9 17.3431 9 19Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 5C9 6.65685 7.65685 8 6 8C4.34315 8 3 6.65685 3 5C3 3.34315 4.34315 2 6 2C7.65685 2 9 3.34315 9 5Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h2>Wasm-Bindgen 插件</h2>
            <span className="tag">Browser</span>
          </div>
          <div className="card-body">
            <p>基于 wasm-bindgen 的浏览器直接集成，自动生成 TypeScript/JavaScript 绑定，API 使用更自然。</p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>User 结构体示例</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>斐波那契数列计算</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>字符串和数组处理</span>
              </div>
            </div>
            <div className="tech-stack">
              <span className="tech-badge">Rust</span>
              <span className="tech-badge">wasm-bindgen</span>
              <span className="tech-badge">TypeScript</span>
            </div>
          </div>
          <div className="card-footer">
            <Link to="/bindgen" className="card-button">查看演示</Link>
          </div>
        </div>
      </div>
      
      <div className="info-section">
        <h3>项目架构说明</h3>
        <div className="architecture">
          <div className="arch-item">
            <div className="arch-icon">🔧</div>
            <h4>extism-plugin</h4>
            <p>使用 Rust + Extism PDK 开发，基于 WASI 标准，适合插件系统和服务端场景。</p>
            <div className="code-block">
              <div className="code-header">
                <span>构建命令</span>
              </div>
              <pre>cargo build --target wasm32-wasi</pre>
            </div>
          </div>
          <div className="arch-item">
            <div className="arch-icon">⚡</div>
            <h4>bindgen-plugin</h4>
            <p>使用 Rust + wasm-bindgen 开发，自动生成 TypeScript/JavaScript API 绑定。</p>
            <div className="code-block">
              <div className="code-header">
                <span>构建命令</span>
              </div>
              <pre>wasm-pack build --target web</pre>
            </div>
          </div>
        </div>
      </div>
      
      <div className="wasm-overview">
        <h3>为什么使用 WebAssembly?</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">🚀</div>
            <h4>接近原生性能</h4>
            <p>WebAssembly 提供接近原生的执行速度，适合计算密集型任务。</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🛡️</div>
            <h4>安全沙箱</h4>
            <p>在内存安全的沙箱环境中执行，提供良好的隔离性。</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🌐</div>
            <h4>跨平台兼容</h4>
            <p>一次编译，随处运行，支持Web、Node.js和嵌入式环境。</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🔄</div>
            <h4>语言互操作</h4>
            <p>支持多种语言编写，与JavaScript无缝集成。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage; 