import React, { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
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
            Tao Bai Pro
          </h1>
        </a>
      </div>
      <Menu onClick={handleClick} selectedKeys={[current]} theme="dark" mode="inline">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          <NavLink to="/">{__('首页')}</NavLink>
        </Menu.Item>
        <SubMenu icon={<UserOutlined />} title={__('个人页')}>
          <Menu.Item key="center">
            <NavLink to="/user/center">{__('个人中心')}</NavLink>
          </Menu.Item>
          <Menu.Item key="setting">
            <NavLink to="/user/setting">{__('个人设置')}</NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Menus;
