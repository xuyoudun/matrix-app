import React, {ReactNode} from 'react';
import {Layout, Menu} from 'antd';
import './PCLayout.less';
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';
import NvaTab from '../nva-tab/NvaTab';

const {Header, Sider, Content} = Layout;

interface PCLayoutProps {
  children?: ReactNode | undefined;
}

const PCLayout: React.FC<PCLayoutProps> = (props) => {
  const {children} = props;
  /* const [collapsed, setCollapsed] = useState(false);
   const handleToggle = (collapsed: any) => {
     setCollapsed(!collapsed)
   }*/

  return (
    <Layout>
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
        <Header>

        </Header>
        <Content className={'page-container'}>
          <NvaTab/>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default PCLayout;
