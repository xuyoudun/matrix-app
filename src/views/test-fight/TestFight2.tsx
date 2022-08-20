/**
 * 用于测试
 */
import React, {useState} from 'react';
import {Alert, DatePicker, message as msgBox, Table} from 'antd';
import {AlertProps} from 'antd/lib/alert';
import moment, {Moment} from 'moment';

const TestFight: React.FC<AlertProps> = ({message, type = 'success'}) => {
  const [date, setDate] = useState<Moment | null>(moment());
  const handleChange = (value: Moment | null) => {
    msgBox.info(`您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`);
    setDate(value);
  };

  return (
    <>
      <div style={{width: '80%', margin: '100px auto'}}>
        <DatePicker onChange={handleChange}
            value={date}
        />
        <Alert description={date ? date.format('YYYY年MM月DD日') : '未选择'}
            message="当前日期"
            style={{marginTop: 12}}
        />
        <Alert
            description="我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。"
            message={message}
            showIcon
            style={{marginTop: 12}}
            type={type}
        />
        <Table/>
      </div>
    </>
  );
};

export default TestFight;
