import React from 'react';
import {Col, Row} from 'antd';
import './FormItemLayout.less';

const DEFAULT_LABEL_SPAN_XS = 24;
const DEFAULT_LABEL_SPAN_LG = 12;
const DEFAULT_LABEL_SPAN_XL = 9;
const DEFAULT_LABEL_SPAN_XXL = 6;

function countLabelCol (span, colSpan){
  return Math.ceil(span / colSpan);
}
function countWrapperCol (span, colSpan) {
  let wrapperSpan = 24 - span;
  wrapperSpan = wrapperSpan === 0 ? 24 : wrapperSpan;
  return wrapperSpan + (span - Math.ceil(span / colSpan));
}

class FormItemLayout extends React.Component {

  render() {
    const {children, column = 3, fixed} = this.props;

    const formItem = React.Children.map(children, (child) => {
      if (!child) {
        return null;
      }

      const {labelCol, wrapperCol, colSpan = 1} = child.props;
      let formItemLayout = {
        labelCol: labelCol ? labelCol : {
          xs: countLabelCol(DEFAULT_LABEL_SPAN_XS, colSpan),
          lg: countLabelCol(DEFAULT_LABEL_SPAN_LG, colSpan),
          xl: countLabelCol(DEFAULT_LABEL_SPAN_XL, colSpan),
          xxl:countLabelCol(DEFAULT_LABEL_SPAN_XXL, colSpan)
        },
        wrapperCol: wrapperCol ? wrapperCol : {
          xs: countWrapperCol(DEFAULT_LABEL_SPAN_XS, colSpan),
          lg: countWrapperCol(DEFAULT_LABEL_SPAN_LG, colSpan),
          xl: countWrapperCol(DEFAULT_LABEL_SPAN_XL, colSpan),
          xxl: countWrapperCol(DEFAULT_LABEL_SPAN_XXL, colSpan)
        }
      };
      if (fixed) {
        formItemLayout = {
          labelCol: labelCol ? labelCol : {span: countLabelCol(DEFAULT_LABEL_SPAN_XL, colSpan)},
          wrapperCol: wrapperCol ? wrapperCol : {span: countWrapperCol(DEFAULT_LABEL_SPAN_XL, colSpan)}
        };
      }
      return (
        <Col
            span={(24 / column) * colSpan}
        >
          {React.cloneElement(child, {...formItemLayout})}
        </Col>
      );
    });

    return (
        <Row className={fixed ? 'js-form-layout js-form-layout-fixed' : 'js-form-layout'}
            gutter={fixed ? 0 : {
              lg: 8,
              sm: 16,
              xs: 16
            }}
            type="flex"
        >
          {formItem}
        </Row>
    );
  }

}

export default FormItemLayout;
