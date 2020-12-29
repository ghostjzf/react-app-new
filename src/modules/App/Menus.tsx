import React, { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

const Menus = () => {
  const [current, setCurrent] = useState<string>('mail');

  const handleClick = (e: any) => {
    console.log(__('首页'));
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <div
        style={{
          color: '#fff',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          transition: 'padding .3s cubic-bezier(.645,.045,.355,1)',
          cursor: 'pointer'
        }}>
        <a>
          <img
            src="https://preview.pro.ant.design/static/logo.f0355d39.svg"
            alt="logo"
            style={{ display: 'inline-block', height: '32px', verticalAlign: 'middle' }}
          />
          <h1
            style={{
              display: 'inline-block',
              color: '#fff',
              margin: '0 0 0 12px',
              height: '32px',
              fontSize: '18px',
              verticalAlign: 'middle',
              lineHeight: '32px'
            }}>
            Ant Design Pro
          </h1>
        </a>
      </div>
      <Menu onClick={handleClick} selectedKeys={[current]} theme="dark" mode="inline">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          <NavLink to="/">{__('首页')}</NavLink>
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Menus;
