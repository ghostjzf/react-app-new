import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Menus from './Menus';
import Header from './Header';
import Content from './Content';
import 'antd/dist/antd.less';

const { Footer, Sider } = Layout;

export default function App() {
  return (
    <div className="app-wrap">
      <BrowserRouter>
        <Layout>
          <Sider style={{ height: '100vh', position: 'sticky', top: 0 }}>
            <Menus />
          </Sider>
          <Layout>
            <Header />
            <Content />
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
