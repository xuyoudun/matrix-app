import {Button, Form, Input, InputNumber, Select, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {getEditView, getQueryView, listOrPageEntityData, QueryView} from '../../api/entity-expose';
import {useParams} from 'react-router-dom';
import Whether from './Whether';
import FormItemLayout from './FormItemLayout';

const EntityQuery: React.FC<any> = () => {

  const pathVariable = useParams<Record<string, any>>();
  const [queryView, setQueryView] = useState<QueryView>({formItems: [], columns: []});
  const [dataSource, setDataSource] = useState<any>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [form] = Form.useForm();

  const queryData = () => {
    setDataLoading(true);
    form.validateFields()
      .then((values) => listOrPageEntityData(pathVariable.name, values))
      .then((res) => {
        setDataSource(res.dataSource);
        setDataLoading(false);
      })
      .finally(() => {
        setDataLoading(false);
      });
  };

  useEffect(() => {
    getQueryView(pathVariable.name, {}).then((response) => {
      setQueryView(response);
      setTimeout(queryData, 10);
    });
  }, []);

  const operator = [
    {
      dataIndex: 'edit',
      title: '操作',
      render: (text: any, row: any) => {
        return <Button onClick={() => {
          getEditView(pathVariable.name, row).then((res) => {
            // eslint-disable-next-line no-console
            console.log(res);
          });
        }
        }>{'编辑'}</Button>;
      }
    }
  ];

  return (
    <>
      <Form form={form} layout={'inline'}>
        <FormItemLayout>
        {
          queryView.formItems.map((item) => {
            let inputType = <Input allowClear/>;
            if (item.valueType == 'Select') {
              inputType = <Select allowClear options={item.options} style={{width: '200px'}}/>;
            } else if (item.valueType == 'InputNumber') {
              inputType = <InputNumber/>;
            } else if (item.valueType == 'Switch') {
              // inputType = <Checkbox.Group options={[{ label: '', value: 'T' }]}/>;
              inputType = <Whether/>;
            }

            return (
              <Form.Item key={item.name} name={item.name} label={item.label}>
                {inputType}
              </Form.Item>
            );
          })
        }
        <Button onClick={() => form.resetFields()}>{'重置'}</Button>
        <Button type="primary" onClick={queryData}>{'查询'}</Button>
        </FormItemLayout>
      </Form>
      <Table columns={queryView.columns.concat(operator)} dataSource={dataSource} loading={dataLoading}/>
    </>
  );


};

export default EntityQuery;
