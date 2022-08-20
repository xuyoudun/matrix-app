/**
 * 组件式路由更符合React思想，但集中式路由更容易理解和管理
 * 在这里统一配置后，后续在组件里边使用<Outlet/>即可渲染子组件
 * 项目要求路由路径统一使用中划线的形式/report/contract-category，禁止使用驼峰
 *
 * @author xuyoudun
 * @email udun.xu@hotmail.com
 * @date 2022年08月11日
 */
import {ComponentType, lazy} from 'react';
import {Navigate} from 'react-router-dom';
import {PCLayout, NAV_TAB_DASHBOARD} from '@/components';
import Dashboard from '../views/dashboard/Dashboard';
import Login from '../views/login/Login';

export interface RouteConfig {
  caseSensitive?: boolean;
  children?: RouteConfig[];
  component?: ComponentType<any>;
  props?: Record<string, any>; /*组件props*/
  index?: boolean;
  path: string;
  mete?: { title?: string, cache?: boolean };
}

const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: PCLayout,
    children: [
      {
        path: '/',
        component: Navigate,
        props: {to: `${NAV_TAB_DASHBOARD.url}?tname=${NAV_TAB_DASHBOARD.title}`}
      },
      {
        path: NAV_TAB_DASHBOARD.url,
        component: Dashboard
      },
      {
        path: '/666',
        component: lazy(() => import('@/components/test-fight/TestFight'))
      },
      {
        path: '/777',
        component: lazy(() => import('@/components/test-fight/TestFight'))
      },
      {
        path: '/888',
        component: lazy(() => import('@/components/test-fight/TestFight'))
      },
      {
        path: '/999',
        component: lazy(() => import('@/components/test-fight/TestFight'))
      },
      {
        path: '/555',
        component: lazy(() => import('@/components/test-fight/TestFight2'))
      }
    ]
  }
];

export default constantRoutes;
