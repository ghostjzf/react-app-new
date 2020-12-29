import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import 'antd/dist/antd.less';

export default function App() {
  return (
    <div className="app-wrap">
      <BrowserRouter>
        <div>
          <Header />
          <Content />
        </div>
      </BrowserRouter>
    </div>
  );
}
