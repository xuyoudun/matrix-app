import React, {Context, ReactNode} from 'react';

interface AppProps {
  children?: ReactNode | undefined;
}

export type AppContextProps = {
  token?: string;
  username?: string;
  menus?: any[];
  roles?: any[];
  position?: [];
}


export const AppContext: Context<AppContextProps> = React.createContext({});

const AppProvider: React.FC<AppProps> = ({children}) => {

  const username = '匿名用户';
  const menus: any[] = [];
  const roles: any[] = [];

  return (
    <AppContext.Provider value={{username, menus, roles}}>
      {children}
    </AppContext.Provider>
  );
}


export default AppProvider;
