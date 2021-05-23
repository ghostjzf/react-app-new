import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import menus from 'stores/menus';

const { SubMenu } = Menu;

const Menus = () => {
  const location = useLocation();
  const [current, setCurrent] = useState<string>(location.pathname);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [tempOpenKeys, setTempOpenKeys] = useState<string[]>([]);
  const ui = useSelector((state: {ui: any}) => state.ui);

  console.log(ui);

  const handleClick = (e: any) => {
    console.log('click ', e);
    const key = e.key;

    if (key === current) {
      return;
    }

    setCurrent(key);
  };

  const onOpenKeysChange = (e: any) => {
    const key = e.key;

    if (openKeys.includes(key)) {
      const newOpenKeys = openKeys.filter((item) => item !== key);

      setOpenKeys(newOpenKeys);
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };

  const getOpenKeys = () => {
    const keysData: any[] = [];

    menus.forEach((item) => {
      if (item.path === location.pathname) {
        keysData.push(item.path);
      }

      if (item.children) {
        item.children.forEach((child) => {
          if (child.path === location.pathname) {
            keysData.push(item.path);
          }
        });
      }
    });

    setTempOpenKeys(keysData);
    setOpenKeys(keysData);
  };

  useEffect(() => {
    if (ui.collapsed) {
      setTempOpenKeys(openKeys);
      setOpenKeys([]);
    } else {
      setOpenKeys(tempOpenKeys);
      setTempOpenKeys([]);
    }
  }, [ui.collapsed]);

  useEffect(() => {
    setCurrent(location.pathname);
    getOpenKeys();
  }, [location.pathname]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          color: '#fff',
          position: 'relative',
          display: 'flex',
          justifyContent: ui.collapsed ? 'center' : 'start',
          alignItems: 'center',
          padding: '16px',
          transition: 'padding .3s cubic-bezier(.645,.045,.355,1)',
          cursor: 'pointer',
          overflow: 'hidden'
        }}>
        <img
          src="https://preview.pro.ant.design/static/logo.f0355d39.svg"
          alt="logo"
          style={{ display: 'inline-block', height: '32px', verticalAlign: 'middle' }}
        />
        <h1
          style={{
            display: ui.collapsed ? 'none' : 'inline-block',
            color: '#fff',
            fontSize: '18px',
            margin: '0 0 0 12px',
            height: '32px',
            verticalAlign: 'middle',
            lineHeight: '32px',
            whiteSpace: 'nowrap'
          }}>
          Tao Bai Pro
        </h1>
      </div>
      <Menu
        style={{ userSelect: 'none' }}
        onClick={handleClick}
        openKeys={openKeys}
        selectedKeys={[current]}
        theme="dark"
        mode="inline">
        {menus.map((item) => {
          if (item.children) {
            return (
              <SubMenu onTitleClick={onOpenKeysChange} key={item.path} icon={item.icon} title={item.title}>
                {item.children.map((child) => {
                  return (
                    <Menu.Item key={child.path}>
                      <NavLink to={child.path}>{child.title}</NavLink>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }

          return (
            <Menu.Item key={item.path} icon={item.icon}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default Menus;
