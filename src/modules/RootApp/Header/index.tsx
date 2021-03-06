import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, Menu, Dropdown, Button } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import http from 'utils/http';

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const store = useSelector((state) => state.security);
  const dispatch = useDispatch();

  console.log(store);
  const toggleCollapsed = () => {
    const newVal = !collapsed;

    setCollapsed(newVal);

    dispatch({
      type: 'SET_COLLAPSED',
      payload: {
        collapsed: newVal
      }
    });
  };

  useEffect(() => {
    http.get('http://localhost:8080/api/userinfo', {
      params: {
        id: 1
      }
    });
  }, []);

  const menu = (
    <Menu>
      <Menu.Item>
        <NavLink to="/user/center">
          <UserOutlined />
          {__('个人中心')}
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/user/setting">
          <SettingOutlined />
          {__('个人设置')}
        </NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          <LogoutOutlined />
          {__('退出登录')}
        </a>
      </Menu.Item>
    </Menu>
  );

  const onLocaleChange = (e: any) => {
    localStorage.setItem('timezone', e.key);
    location.reload();
  };

  const localeMenu = (
    <Menu onClick={onLocaleChange} style={{ minWidth: '120px' }}>
      <Menu.Item key="cn">
        <span style={{ fontSize: '12px', paddingRight: '5px' }}>CN</span>
        <span>简体中文</span>
      </Menu.Item>
      <Menu.Item key="us">
        <span style={{ fontSize: '12px', paddingRight: '5px' }}>US</span>
        <span>English</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row align="middle" style={{ height: '48px', backgroundColor: '#fff', padding: '0 10px 0 5px' }}>
      <Col span={10}>
        <Button size="small" onClick={toggleCollapsed}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
      </Col>
      <Col span={14}>
        <Row justify="end" align="middle" style={{ height: '100%' }}>
          <Col>
            <Dropdown overlay={menu}>
              <div>
                <Avatar
                  style={{ marginRight: '8px' }}
                  size="small"
                  src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                />
                <span style={{ verticalAlign: 'bottom', padding: '0 12px 0 0' }}>Serati Ma</span>
              </div>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown overlay={localeMenu}>
              <span
                className="ant-dropdown-trigger antd-pro-components-global-header-index-action"
                style={{
                  cursor: 'pointer',
                  padding: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  verticalAlign: 'middle'
                }}>
                <i className="anticon" title="语言">
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                      className="css-c4d79v"></path>
                  </svg>
                </i>
              </span>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
