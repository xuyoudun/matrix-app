import React, {ReactNode, Suspense, useContext} from 'react';
import {Layout, Menu, Spin} from 'antd';
import './PCLayout.less';
import NvaTab from '../nva-tab/NvaTab';
import {Outlet} from 'react-router-dom';
import NvaTabProvider from '../provider/NvaTabProvider';
import {AuthContext} from '../provider/AuthProvider';

const {Header, Sider, Content} = Layout;

interface PCLayoutProps {
  children?: ReactNode | undefined;
}

const PCLayout: React.FC<PCLayoutProps> = () => {
  const {menus} = useContext(AuthContext);
  return (
    <Layout>
      {/*侧边菜单*/}
      <Sider
          collapsible
          style={{}}
          trigger={null}
      >
        <div style={{height: '64px', padding: '0 50px', lineHeight: '64px'}}/>
        <div style={{minHeight: 'calc(100vh - 64px)', overflowY: 'auto'}}>
          <Menu
              defaultSelectedKeys={['1']}
              items={menus}
              mode="inline"
              onClick={({item, key, keyPath, domEvent}) => {
                // eslint-disable-next-line no-console
              console.log(item, key, keyPath, domEvent);
            }}
              theme="dark"
          />
        </div>
      </Sider>
      <Layout>
        {/*头部*/}
        <Header/>

        {/*页面*/}
        <Content className={'page-container'}>
          <NvaTabProvider>
            <NvaTab/>
            <Suspense fallback={<Spin spinning>{'页面加载中...'}</Spin>}>
              <Outlet/>
            </Suspense>
          </NvaTabProvider>
        </Content>

      </Layout>
    </Layout>
  );
};

export default PCLayout;
