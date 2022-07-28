import React, {useState} from 'react';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment, {Moment} from 'moment';
import 'moment/locale/zh-cn';
import {Alert, ConfigProvider, DatePicker, message, Table} from 'antd';
import 'antd/dist/antd.less';

import './App.css';

moment.locale('zh-cn');

function App() {
  const [date, setDate] = useState<Moment | null>();
  const handleChange = (value: Moment | null) => {
    message.info(`您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`);
    setDate(value);
  };

  return (
    <ConfigProvider componentSize="small" locale={zhCN}>
      <div style={{width: 400, margin: '100px auto'}}>
        <DatePicker onChange={handleChange}/>
        <div style={{marginTop: 16}}>
          <Alert message="当前日期" description={date ? date.format('YYYY年MM月DD日') : '未选择'}/>
        </div>
        <Table/>
      </div>
    </ConfigProvider>
  );
}

export default App;
