import React, {useEffect} from 'react';
import {SwitchProps} from 'antd/lib/switch';
import {Switch} from 'antd';

type WhetherProps = {
  defaultChecked?: string
  onChange?: (checked: string, event?: React.MouseEvent<HTMLButtonElement>) => void
}

const Whether: React.FC<SwitchProps & WhetherProps> = ({onChange, defaultChecked, ...props}) => {

  useEffect(() => {
    onChange?.(defaultChecked == 'T' ? 'T' : 'F');
  }, []);

  return (
    <Switch  {...props}
        onChange={(checked, event) => {
               onChange?.(checked ? 'T' : 'F', event);
             }}
        defaultChecked={defaultChecked == 'T'}
        checkedChildren="是"
        unCheckedChildren="否"/>
  );
};

/*
export const WhetherCheckbox: React.FC<SwitchProps & WhetherProps> = ({onChange, defaultChecked, ...props}) => {

  useEffect(() => {
    onChange?.(defaultChecked == 'T' ? 'T' : 'F');
  }, []);

  return (
    <Checkbox  {...props}
        onChange={(checked, event) => {
               onChange?.(checked ? 'T' : 'F', event);
             }}
        defaultChecked={defaultChecked == 'T'}
        checkedChildren="是"
        unCheckedChildren="否"/>
  );
};
*/

export default Whether;
