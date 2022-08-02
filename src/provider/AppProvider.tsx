import React, {Context, ReactNode} from 'react';

interface AppProps {
  children?: ReactNode | undefined;
}

export type AppContextProps = {
  username?: string;
}

export const AppContext: Context<AppContextProps> = React.createContext({});

const AppProvider: React.FC<AppProps> = ({children}) => {

  const username = '匿名用户'

  return (
    <AppContext.Provider value={{username}}>
      {children}
    </AppContext.Provider>
  );
}


export default AppProvider;
