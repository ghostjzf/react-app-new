import React from 'react';
import { Layout } from 'antd';
import Routes from '../Routes';

const { Content } = Layout;

export default () => {
  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{ minHeight: 500 }}>
        <Routes />
      </div>
    </Content>
  );
};
