/* eslint-disable no-underscore-dangle */
import React, {useContext, useMemo} from 'react';
import {Form, Input, InputNumber, Select, Switch, Table} from 'antd';
import './table.less';

const EditableContext = React.createContext(null);

/* 深度合并对象 */
const isObject = (obj) => obj.constructor === Object;
const assign = (target, ...options) => {
  options.forEach((option) => {
    /* Only deal with non-null/undefined values */
    option != null && Object.keys(option).forEach((key) => {
      const src = target[key];
      const copy = option[key];

      // Prevent never-ending loop
      if (target === copy) return;

      // Recurse if we're merging plain objects or arrays
      if (copy && (Array.isArray(copy) || isObject(copy))) {
        let clone = null;
        if (Array.isArray(copy)) {
          clone = src && Array.isArray(src) ? src : [];
        } else {
          clone = src && isObject(src) ? src : {};
        }
        // Never move original objects, clone them
        target[key] = assign(clone, copy);

      } else if (copy !== undefined) {// Don't bring in undefined values
        target[key] = copy;
      }
    });
  });
  return target;
};

/* 传递额外的属性给到单元格，可参考API文档onCell */
const additional = (columns, onCellChange) => {
  return columns.map((column) => {

    return {
      ...column,
      ...(column.children && {children: additional(column.children, onCellChange)}),
      onCell: (record, rowIndex) => ({
        ...column,
        record,
        rowIndex,
        onCellChange
      })
    };
  });
};

/* 劫持列表中表单控件的onChange事件, 提供额外触发埋点和参数from。你依然可以传递onChange事件 */
const DEFAULT_HIJACKED_FORM_CONTROL = [Input, Select, InputNumber, Switch];
const formControl = (type) => DEFAULT_HIJACKED_FORM_CONTROL.includes(type);

/* form行，form托管太多表单控件会影响性能 */
const EditableRow = ({/*index, */...props}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

/* 可编辑单元格 */
const EditableCell = (props) => {
  const {
    children,
    // dataIndex,
    record,
    render,
    // rowIndex, // 行号
    // renderFormItem,
    onCellChange,
    colSpan,
    rowSpan,
    style,
    className
  } = props;

  const form = useContext(EditableContext);

  const hijacked = (element) => {
    try {
      if (!React.isValidElement(element)) {
        return element;
      }

      const {props: $props, type, key} = element;
      const {children: $children, onChange, onBlur, ...rest} = $props;
      const extra = formControl(type) ?
        {
          onChange: (...args) => {
            onChange && onChange(...args.concat(form));
            // const [value] = args;
            // record[dataIndex] = value.target?.value || value; /* input组件 */
          },
          onBlur: async (...args) => {
            onBlur && onBlur(...args.concat(form));
            form.validateFields().then((values) => {
              record.__touched__ = true;// 标识数据已被用户操作过
              assign(record, values);
              onCellChange && onCellChange(record, form);
            });
          }
        } : {};
      const _props = {...rest, ...extra};

      if (!$children) {
        return React.cloneElement(element, {key, ..._props});
      }

      // 表单控件不会嵌套使用，可提前结束递归
      const _children = React.Children.map($children, (child) => formControl(type) ? child : hijacked(child));
      return React.cloneElement(element, {key, ..._props, children: _children}, ..._children);
    } catch (e) {
      window.console.error(e, element);
    }
  };

  let childElement = children;
  if (render) {
    childElement = childElement.map((element) => hijacked(element));
  } /* else if (renderFormItem) {
    const formItemElement = renderFormItem(record[dataIndex], record, rowIndex, form);
    childElement = hijacked(formItemElement);
  } */

  const tdProps = {className, colSpan, rowSpan, style};

  return <td {...tdProps}>{childElement}</td>;
};


export default function EditableTable(props) {
  const {
    columns,
    onCellChange, // 字段值更新时触发回调事件
    ...restProps
  } = props;

  const $columns = useMemo(() => additional(columns, onCellChange), [columns, columns.length]);

  return (
    <Table
        className="matrix-pro-table"
        bordered
        {...restProps}
        columns={$columns}
        components={{body: {row: EditableRow, cell: EditableCell}}}
    />
  );
}
