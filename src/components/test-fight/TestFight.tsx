/**
 * 用于测试
 */
import React from 'react';
import {Alert} from 'antd';
import {AlertProps} from 'antd/lib/alert';

const TestFight: React.FC<AlertProps> = ({message, type = 'success'}) => {
  return (
    <Alert
      message={message}
      description="我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。"
      type={type}
      showIcon
    />
  );
}

export default TestFight;
