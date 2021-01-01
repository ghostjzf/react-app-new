import React from 'react';
import { Layout } from 'antd';
import Menus from '../Menus';
import Header from '../Header';
import Content from '../Content';
import Login from '../Login';
import { useSelector } from 'react-redux';

const { Footer, Sider } = Layout;

const App = () => {
  const { ui, security } = useSelector((state: { ui: any; security: any }) => state);

  if (!security.isLogin) {
    return <Login />;
  }

  return (
    <Layout>
      <Sider collapsed={ui.collapsed} style={{ height: '100vh', position: 'sticky', top: 0 }}>
        <Menus />
      </Sider>
      <Layout>
        <Header />
        <Content />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
