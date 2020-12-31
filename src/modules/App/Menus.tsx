import React, { useState } from 'react';
import { Menu } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import menus from 'stores/menus';

const { SubMenu } = Menu;

const Menus = () => {
  const location = useLocation();
  const [current, setCurrent] = useState<string>(location.pathname);

  const handleClick = (e: any) => {
    console.log(__('首页'));
    console.log('click ', e);
    setCurrent(e.key);
  };

  const getDefaultOpenKeys = () => {
    let result: string;

    menus.forEach((item) => {
      if (item.path === location.pathname) {
        result = item.path;
      }

      if (item.children) {
        item.children.forEach((child) => {
          if (child.path === location.pathname) {
            result = item.path;
          }
        });
      }
    });

    return result;
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
      <Menu
        onClick={handleClick}
        defaultOpenKeys={[getDefaultOpenKeys()]}
        selectedKeys={[current]}
        theme="dark"
        mode="inline">
        {menus.map((item) => {
          if (item.children) {
            return (
              <SubMenu key={item.path} icon={<UserOutlined />} title={item.title}>
                {item.children.map((child) => {
                  return (
                    <Menu.Item key={child.path} icon={<MailOutlined />}>
                      <NavLink to={child.path}>{child.title}</NavLink>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }

          return (
            <Menu.Item key={item.path} icon={<MailOutlined />}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </Menu.Item>
          );
        })}
        {/* <Menu.Item key="mail" icon={<MailOutlined />}>
          <NavLink to="/">{__('首页')}</NavLink>
        </Menu.Item>
        <SubMenu icon={<UserOutlined />} title={__('个人页')}>
          <Menu.Item key="center">
            <NavLink to="/user/center">{__('个人中心')}</NavLink>
          </Menu.Item>
          <Menu.Item key="setting">
            <NavLink to="/user/setting">{__('个人设置')}</NavLink>
          </Menu.Item>
        </SubMenu> */}
      </Menu>
    </div>
  );
};

export default Menus;
