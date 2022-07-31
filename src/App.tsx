import React, {useState} from 'react';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment, {Moment} from 'moment';
import 'moment/locale/zh-cn';
import {Alert, ConfigProvider, DatePicker, message, Table} from 'antd';
import 'antd/dist/antd.less';
import NvaTabProvider from './components/NvaTabProvider';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NvaTab from './components/NvaTab';

import './App.css';
import TestFight from './components/TestFight';

moment.locale('zh-cn');

const App = () => {
  const [date, setDate] = useState<Moment | null>(moment());
  const handleChange = (value: Moment | null) => {
    message.info(`您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`);
    setDate(value);
  };

  return (
    <ConfigProvider componentSize="small" locale={zhCN}>
      <BrowserRouter>
        <NvaTabProvider>
          <div style={{width: '80%', margin: '100px auto'}}>
            <NvaTab/>
            <DatePicker onChange={handleChange} value={date}/>
            <div style={{marginTop: 16}}>
              <Alert description={date ? date.format('YYYY年MM月DD日') : '未选择'} message="当前日期"/>
            </div>
            <Routes>
              <Route path={'/777'} element={<TestFight message={'777'}/>}></Route>
              <Route path={'/888'} element={<TestFight message={'888'} type={'error'}/>}></Route>
              <Route path={'/999'} element={<TestFight message={'999'}/>}></Route>
            </Routes>
            <Table/>
          </div>
        </NvaTabProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
