import React from 'react';
import Home from './components/Home';
import ResultPage from './components/ResultPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
