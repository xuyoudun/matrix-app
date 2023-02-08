import {Button, Checkbox, Form, Input, InputNumber, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {ConfigData, getConfigView, ConfigView} from '../../api/entity-expose';
import EditableTable from '../../components/table';
import {FieldData} from 'rc-field-form/lib/interface';


const EntityQuery: React.FC<any> = () => {

  const [view, setView] = useState<ConfigView>({
    formItems: [],
    columns: []
  });

  const [configData/*, setConfigData*/] = useState<ConfigData>({
    initialValue: {},
    dataSource: []
  });

  const [form] = Form.useForm();

  useEffect(() => {
    getConfigView().then((res) => {
      const columns = res.columns.map((column) => {
        const {render, ...rest} = column;
        return {
          ...rest,
          ...(render ? {
            render: (text: any) => {
              if (render.valueType == 'Input') {
                return <Form.Item name={render.name} initialValue={text}><Input/></Form.Item>;
              } else if (render.valueType == 'Select') {
                return <Form.Item name={render.name} initialValue={text}><Select
                    options={render.options}/></Form.Item>;
              }
              return text;
            }
          } : null)
        };
      });
      setView({...res, columns});
    });
  }, []);

  const handleChangeEntity = (value: string) => {
    if (value == 'entity_name') {
      value;
    }
  };

  const onFieldsChange = (changedFields: FieldData[], allFields: FieldData[]) => {
    // eslint-disable-next-line no-console
     console.log(changedFields, allFields);
  };

  return (
    <>
      <Form form={form} layout={'inline'} onFieldsChange={onFieldsChange}>
        {
          view.formItems.map((item) => {
            let inputType = <Input/>;
            if (item.valueType == 'Select') {
              inputType = <Select options={item.options} style={{width: '200px'}}
                  onChange={handleChangeEntity}/>;
            } else if (item.valueType == 'InputNumber') {
              inputType = <InputNumber/>;
            }else if (item.valueType == 'Checkbox') {
              inputType = <Checkbox/>;
            }

            return (
              <Form.Item key={item.name} name={item.name} label={item.label}
                /*initialValue={view.initialValue[item.name]}*/>
                {inputType}
              </Form.Item>
            );
          })
        }
        <Button type="primary" onClick={() => {
          null;
        }}>{'保存'}</Button>
      </Form>
      <EditableTable columns={view.columns} dataSource={configData.dataSource} tableLayout={'auto'}
          scroll={{x: '100'}}/>
    </>
  );


};

export default EntityQuery;
