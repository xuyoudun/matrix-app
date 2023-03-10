import React, {Context, ReactNode, useEffect, useState} from 'react';
import {ItemType} from 'antd/es/menu/hooks/useItems';
import {Navigate, NavLink, useLocation} from 'react-router-dom';
import {APIRequest, APIResponse} from '../../api/axios';

export interface OAuth {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
}

export interface RoleType {
  roleCode: string;
  roleName: string;
}

export interface MenuType {
  menuCode: string;
  menuName: string;
  urlPath: string;
  children?: MenuType[];
}

export interface AuthorizationType {
  token?: string;
  username?: string;
  menus?: ItemType[];
  roles?: RoleType[];
  position?: any[];
  setAppOAuth?: (oauth: OAuth) => void;
}

interface AuthenticationRequest<P, T> {
  (requestData: P): Promise<T>;
}

export const authentication: AuthenticationRequest<unknown, OAuth> = (data) => {
  data;
  // TODO
  // 后续切换成请求认证API即可
  const result: OAuth = {
    'access_token': 'c830475f-4f6f-4587-810f-e480d9c749a8',
    'token_type': 'bearer',
    'refresh_token': '84e2e42f-19ac-408c-82b2-b6e48ca1ddae',
    'expires_in': 7200,
    'scope': 'read write trust'
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 300);
  });
};

export const getUser: APIRequest<any> = () => {
  // TODO
  // 后续切换成请求认证API即可
  const username = '匿名用户';
  const menuList: MenuType[] = [
    {
      menuCode: 'test-fight',
      menuName: '测试页',
      urlPath: '',
      children: [
        {
          menuCode: 'test-fight6',
          menuName: 'TestFight6',
          urlPath: '/666'
        },
        {
          menuCode: 'test-fight7',
          menuName: 'TestFight7',
          urlPath: '/777'
        },
        {
          menuCode: 'test-fight8',
          menuName: 'TestFight8',
          urlPath: '/888'
        }
      ]
    },
    {
      menuCode: 'system',
      menuName: '系统设置',
      urlPath: '',
      children: [
        {
          menuCode: 'config-view',
          menuName: '配置页',
          urlPath: '/system/entity/config'
        },
        {
          menuCode: 'query-view',
          menuName: '查询页',
          urlPath: '/system/entity/sup_vendor/query'
        }
      ]
    }
  ];

  // API返回的菜单映射成前端菜单
  const toMenu = (menuList: MenuType[]): ItemType[] => {
    return menuList.map((menu) => {
      return {
        label: <NavLink to={`${menu.urlPath}?tname=${menu.menuName}`}>{menu.menuName}</NavLink>,
        key: menu.menuCode,
        ...(menu.children ? {children: toMenu(menu.children)} : null)
      };
    });
  };

  const menus: ItemType[] = toMenu(menuList);
  const roles: RoleType[] = [];

  const res: APIResponse = {
    status: 'SUCCESS',
    code: '200',
    message: '',
    response: {roles, username, menus}
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 300);
  });
};


export const AuthContext: Context<AuthorizationType> = React.createContext({});

export function useAuth() {
  return React.useContext(AuthContext);
}

interface AuthProviderProps {
  children?: ReactNode | undefined;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

  const [oauth, setOAuth] = useState<OAuth>(() => {
    const accessToken = sessionStorage.getItem('ACCESS_TOKEN');
    return accessToken ? JSON.parse(accessToken) : {};
  });

  const setAppOAuth = (oauth: OAuth) => {
    setOAuth(oauth);
    sessionStorage.setItem('ACCESS_TOKEN', JSON.stringify(oauth));
  };

  const [authorization, setAuthorization] = useState<AuthorizationType>(() => ({username: '未登录'}));

  // token改变后加载用户信息
  useEffect(() => {
    getUser().then((res) => {
      setAuthorization(res.response);
    });
  }, [oauth.access_token]);

  return (
    <AuthContext.Provider value={{...authorization, setAppOAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export function RequireAuth({children}: { children: ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  return children;
}

export default AuthProvider;
