// @flow

import React from 'react';

import { Form, Input, Select } from 'antd';

import { isNumeric, isEmpty } from 'validator';

const FormItem = Form.Item;
const Option = Select.Option;

type Props = {
  form: Object,
};

class AddBillForm extends React.Component<Props> {

  handleSubmit = () => {
    console.log("handleSubmit");
  }
  
  validatorAmount = (rule, value, callback) => {
    if(isEmpty(value, [{ ignore_whitespace:true }])) {
      callback("Please input the amount");
    }
    else if(!isNumeric(value)) {
      callback("Input is a invalid number");
    } 
    else {
      callback();
    }
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Amount"
        >
          {getFieldDecorator('amount', {
            rules: [
              {
                type: 'number',
                validator: this.validatorAmount,
                required: true,
              }
            ],
          })(
            <Input />
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
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create()(AddBillForm);

export default WrappedRegistrationForm;
