import {RouteObject} from 'react-router/lib/router';
import React from 'react';
import {useRoutes} from 'react-router-dom';
import constantRoutes, {RouteConfig} from '../../route/routes';

const createRoutes = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map((route) => {
    const {component, props, children, ...rest} = route;
    return {
      ...rest,
      element: component ? React.createElement(component, props) : null,
      ...(children ? {children: createRoutes(children)} : null)
    };
  });
};

const routes = createRoutes(constantRoutes);
const AppRoutes = () => useRoutes(routes);

export default AppRoutes;
