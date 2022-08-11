import React, {ReactNode, Suspense} from 'react';
import {Layout, Menu, Spin} from 'antd';
import './PCLayout.less';
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';
import NvaTab from '../nva-tab/NvaTab';
import {Outlet} from 'react-router-dom';
import NvaTabProvider from '../provider/NvaTabProvider';

const {Header, Sider, Content} = Layout;

interface PCLayoutProps {
  children?: ReactNode | undefined;
}

const PCLayout: React.FC<PCLayoutProps> = () => {

  return (
    <Layout>
      {/*侧边菜单*/}
      <Sider trigger={null} collapsible style={{}}>
        <div style={{height: '64px', padding: '0 50px', lineHeight: '64px'}}></div>
        <div style={{minHeight: 'calc(100vh - 64px)', overflowY: 'auto'}}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined/>}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined/>}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined/>}>
              nav 4
            </Menu.Item>
            <Menu.Item key="5" icon={<UploadOutlined/>}>
              nav 5
            </Menu.Item>
            <Menu.Item key="6" icon={<UploadOutlined/>}>
              nav 6
            </Menu.Item>
            <Menu.Item key="7" icon={<UploadOutlined/>}>
              nav 7
            </Menu.Item>
            <Menu.Item key="8" icon={<UploadOutlined/>}>
              nav 8
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
      <Layout>
        {/*头部*/}
        <Header>

        </Header>

        {/*页面*/}
        <Content className={'page-container'}>
          <NvaTabProvider>
            <NvaTab/>
            <Suspense fallback={<Spin spinning={true}>{'页面加载中...'}</Spin>}>
              <Outlet/>
            </Suspense>
          </NvaTabProvider>
        </Content>

      </Layout>
    </Layout>
  );
}

export default PCLayout;
