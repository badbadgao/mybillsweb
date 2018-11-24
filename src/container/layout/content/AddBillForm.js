// @flow

import * as React from 'react';

import { Form, Input, Select, DatePicker } from 'antd';

import { isNumeric, isEmpty } from 'validator';

const FormItem = Form.Item;
const Option = Select.Option;

type Props = {
  form: Object,
};

class AddBillForm extends React.Component<Props> {

  validateAmount = (rule, value, callback) => {
    if(!value || isEmpty(value, [{ ignore_whitespace:true }])) {
      callback("Please input the amount");
    }
    else if(!isNumeric(value)) {
      callback("Input is a invalid number");
    } 
    else {
      callback();
    }
  }

  validateDueDate = (rule, value, callback) => {
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (
      <Form>
        <FormItem
            {...formItemLayout}
            label="Type"
            hasFeedback
          >
         {getFieldDecorator('type', {
              rules: [
                { type: 'string', required: true, message: 'Please select a type!' },
              ],
            })(
              <Select placeholder="Please select a bill type">
                <Option value="water">Water</Option>
                <Option value="electricity">Electricity</Option>
                <Option value="internet">Internet</Option>
              </Select>
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Provider"
          hasFeedback
        >
          {getFieldDecorator('provider', {
            rules: [
              { required: true, message: 'Please select a provider!' },
            ],
          })(
            <Select placeholder="Please select a provider">
              <Option value="vodaphone">Vodaphone</Option>
              <Option value="contactEnergy">Contact Energy</Option>
              <Option value="Spark">Spark</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Amount"
        >
          {getFieldDecorator('amount', {
            rules: [
              {
                type: 'number',
                validator: this.validateAmount,
                required: true,
              }
            ],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Due Date"
        >
          {getFieldDecorator('dueDate', {
            rules: [
              {
                type: 'date',
                validator: this.validateDueDate,
                required: true,
              }
            ],
          })(
            <DatePicker />
          )}
        </FormItem>
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create()(AddBillForm);

export default WrappedRegistrationForm;
