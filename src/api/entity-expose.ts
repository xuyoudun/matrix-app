import api from './axios';

type POJO = Record<string, any>;

export type FormItem = {
  label: string; // label 标签的文本
  name: string; // NamePath
  valueType: string; // 前端控件类型 Input,InputNumber,DatePick,Select,CheckBox,Radio
  options: { label: string, value: string | number }[]; // Select选项内容{ label, value }[]
  dependencies: string;
}

export type Column = {
  dataIndex: string;
  title: string;
  width?: string;
  render?: any;
}

export  type QueryView = { formItems: FormItem[], columns: Column[] }

export  type ConfigView = { formItems: FormItem[], columns: Column[] }

export type ConfigData = { dataSource: POJO[], initialValue: POJO }

export const getQueryView = (entityName: string, data: any): Promise<QueryView> => {
  return api.post(`/entity/view/${entityName}/query`, data);
};

export const listOrPageEntityData = (entityName: string, data: any, pageNum = 1, pageSize = 0): Promise<any> => {
  return api.post(`/entity/${entityName}/data?pageNum=${pageNum}&pageSize=${pageSize}`, data);
};

export const getEditView = (entityName: string, data: any): Promise<any> => {
  return api.post(`/entity/view/${entityName}/edit`, data);
};

export const getConfigView = (): Promise<ConfigView> => {
  return api.post('/entity/view/config');
};

export const getConfigData = (entityName: string): Promise<ConfigData> => {
  return api.post(`/entity/${entityName}/config/data`);
};



