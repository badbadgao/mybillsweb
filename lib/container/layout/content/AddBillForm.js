//      

import React from 'react';

import { Form, Input } from 'antd';

const FormItem = Form.Item;

              
               
  

class AddBillForm extends React.Component        {

  handleSubmit = () => {
    console.log("handleSubmit");
  }
  
  validatorAmount = () => {
    
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
                message: 'The input is not valid amount',
              },
              {
                validator: this.validatorAmount,
              },
              {
                required: true,
                message: 'Please input the amount!',
              }
            ],
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create()(AddBillForm);

export default WrappedRegistrationForm;
