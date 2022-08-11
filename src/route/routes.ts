import React, {ComponentType, lazy} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import PCLayout from '../components/pc-layout/PCLayout';
import {RouteObject} from 'react-router/lib/router';
import Login from '../views/login/Login';
import {NAV_TAB_DASHBOARD} from '../components/provider/NvaTabProvider';

export interface RouteConfig {
  caseSensitive?: boolean;
  children?: RouteConfig[];
  component?: ComponentType<any>;
  props?: Record<string, any>; /*组件props*/
  index?: boolean;
  path: string;
  mete?: { title?: string, cache?: boolean }
}

export const constantRoutes: RouteConfig[] = [
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
        path: '/666',
        component: lazy(() => import('@components/test-fight/TestFight')),
      },
      {
        path: '/777',
        component: lazy(() => import('@components/test-fight/TestFight'))
      },
      {
        path: '/888',
        component: lazy(() => import('@components/test-fight/TestFight'))
      },
      {
        path: '/999',
        component: lazy(() => import('@components/test-fight/TestFight'))
      },
      {
        path: '/555',
        component: lazy(() => import('@components/test-fight/TestFight2'))
      }
    ]
  }
];


const createRoutes = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map((route) => {
    const {component, props, children, ...rest} = route;
    return {
      ...rest,
      element: component ? React.createElement(component, props) : null,
      ...(children ? {children: createRoutes(children)} : null),
    }
  })
}

const routes = createRoutes(constantRoutes)
const AppRoutes = () => useRoutes(routes);

export default AppRoutes;
