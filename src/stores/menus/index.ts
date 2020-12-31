import { lazy } from 'react';

export default [
  {
    path: '/',
    title: '首页',
    component: lazy(() => import('@/modules/Home/index'))
  },
  {
    title: '个人页',
    path: '/user',
    children: [
      {
        path: '/user/center',
        title: '个人中心',
        component: lazy(() => import('@/modules/user/Center'))
      },
      {
        path: '/user/setting',
        title: '个人设置',
        component: lazy(() => import('@/modules/user/Settings'))
      }
    ]
  }
];
