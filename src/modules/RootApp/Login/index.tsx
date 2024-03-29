import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import http from 'utils/http';
import './style.scss';

const NormalLoginForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);

    http
      .post('http://localhost:8080/api/login', values, {
        useJson: true
      })
      .then(() => {
        dispatch({
          type: 'LOGIN',
          payload: {
            isLogin: true,
            currentUser: values.username
          }
        });
      });
  };

  return (
    <div className="login">
      <div className="login-content">
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NormalLoginForm;
