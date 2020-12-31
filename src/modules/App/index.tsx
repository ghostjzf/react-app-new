import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import Menus from './Menus';
import Header from './Header';
import Content from './Content';
import { createStore } from 'redux';
import rootReducers from '@/reducers';
import 'antd/dist/antd.less';

const { Footer, Sider } = Layout;

const store = createStore(rootReducers);

export default function App() {
  return (
    <div className="app-wrap">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}
