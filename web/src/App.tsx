import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './components/IndexPage';
import WasmComponent from './components/WasmComponent';
import WasmBindgenExample from './components/WasmBindgenExample';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/extism" element={<WasmComponent />} />
            <Route path="/bindgen" element={<WasmBindgenExample />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App; 