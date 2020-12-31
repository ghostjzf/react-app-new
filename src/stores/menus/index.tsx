import React from 'react';
import { lazy } from 'react';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import __ from '@/utils/i18n';

export default [
  {
    path: '/',
    title: __('首页'),
    icon: <UserOutlined />,
    component: lazy(() => import('@/modules/Home/index'))
  },
  {
    title: __('个人页'),
    path: '/user',
    icon: <MailOutlined />,
    children: [
      {
        path: '/user/center',
        title: __('个人中心'),
        component: lazy(() => import('@/modules/user/Center'))
      },
      {
        path: '/user/setting',
        title: __('个人设置'),
        component: lazy(() => import('@/modules/user/Settings'))
      }
    ]
  }
];
