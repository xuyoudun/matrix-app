import React from 'react';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {ConfigProvider} from 'antd';
import 'antd/dist/antd.less';
import {BrowserRouter} from 'react-router-dom';

import './App.css';
import {AppRoutes, AuthProvider} from '@/components';

moment.locale('zh-cn');

const App = () => {

  return (
    <ConfigProvider
        componentSize="small"
        locale={zhCN}
    >
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes/>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
