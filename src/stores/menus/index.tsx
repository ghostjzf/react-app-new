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
    path: "/table",
    title: "列表页",
    icon: <UserOutlined />,
    children: [
      {
        title: __('table-render'),
        path: '/table/basic',
        component: lazy(() => import('@/modules/list/TableRender'))
      },
      {
        title: __('pro-table'),
        path: '/table/pro',
        component: lazy(() => import('@/modules/list/ProTable'))
      },
    ]
  },
  {
    title: __('详情页'),
    path: '/profile',
    icon: <UserOutlined />,
    children: [
      {
        title: __('基础详情页'),
        path: '/profile/basic',
        component: lazy(() => import('@/modules/profile/Basic'))
      },
      {
        path: '/user/advanced',
        title: __('个人设置'),
        component: lazy(() => import('@/modules/profile/Advanced'))
      }
    ]
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
