import React, {Context, ReactNode, useEffect, useState} from 'react';
import {ItemType} from 'antd/es/menu/hooks/useItems';

export interface AuthProviderProps {
  children?: ReactNode | undefined;
}

/*export interface AppMenuType {
  danger?: boolean;
  icon?: React.ReactNode;
  title?: string;
  theme?: 'dark' | 'light';
  children: ItemType[];
  key?: React.Key;
  dashed?: boolean;
}*/

export interface IamRole {
  roleCode: string;
  roleName: string;
}

export interface IamMenu {
  menuCode: string;
  menuName: string;
  children?: IamMenu[];
}

export interface OAuth {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
}

export interface AuthContextProps {
  token?: string;
  username?: string;
  menus?: ItemType[];
  roles?: IamRole[];
  position?: any[];
  setAppOAuth?: (oauth: OAuth) => void;
}

export const  AuthContext: Context<AuthContextProps> = React.createContext({});

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

  const [oauth, setOAuth] = useState<OAuth>({});
  const setAppOAuth = (oauth: OAuth) => {
    setOAuth(oauth);
    sessionStorage.setItem('ACCESS_TOKEN', JSON.stringify(oauth));
  };

  const username = '匿名用户';
  const menus: ItemType[] = [
    {label: '菜单项一', key: 'item-1'}, // 菜单项务必填写 key
    {label: '菜单项二', key: 'item-2'},
    {
      label: '子菜单',
      key: 'submenu',
      children: [{label: '子菜单项', key: 'submenu-item-1'}]
    }
  ];
  const roles: IamRole[] = [];


  // token改变后加载用户信息
  useEffect(() => {
    //
  }, [oauth.access_token]);

  return (
    <AuthContext.Provider value={{username, menus, roles, setAppOAuth}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
