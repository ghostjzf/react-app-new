import React from 'react';
import { Layout } from 'antd';
import Routes from '../Routes';
import './index.scss';

const { Content } = Layout;

export default () => {
  return (
    <div>
      <Content className="app-content">
        <div className="site-layout-background" style={{ minHeight: 500 }}>
          <Routes />
        </div>
      </Content>
    </div>
  );
};
