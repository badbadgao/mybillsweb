//      

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filter, find } from 'lodash';

import { Form, Input, Select, DatePicker } from 'antd';
import { isNumeric, isEmpty } from 'validator';

const FormItem = Form.Item;
const Option = Select.Option;

class AddBillForm extends React.Component        {

  state = {
    types: this.props.types,
    providers: this.props.providers,
    selectedType: undefined,
    selectedProvider: undefined,
  };

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

  /*The argument selectedProvider is name of the provider*/
  handleProviderSelectChange = (selectedProviderName) => {
    const selectedProvider = find(this.props.providers, {name: selectedProviderName});
    const typesFromSelectedProvider = selectedProvider.type;

    const typesObjFromSelectedProvider = filter(
      this.props.types, type => !!find(typesFromSelectedProvider, name => type.name == name)
    );

    if(!find(typesObjFromSelectedProvider, {name: this.state.selectedType})) {
      this.setState({
        selectedType: typesObjFromSelectedProvider[0],
      });

      this.props.form.setFieldsValue({
       type: typesObjFromSelectedProvider[0].name,
      });
    }

    this.setState({
      selectedProvider,
    });
  }

   /*The argument selectedProvider is name of the provider*/
  handleTypeSelectChange = (selectedType) => {
    const providers = filter(this.props.providers, provider => find(provider.type, type => type ==  selectedType));
    
    this.props.form.setFieldsValue({
      provider: providers[0].name,
    });

    this.setState({
      selectedType,
      providers: providers
    });
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

    // const selectedProvider = this.state.selectedProider 

    // const billTypes = filter(this.state.types, billType => {
    //   if(this.state.selectedProivder)
    // })

    const typeSelectComponent = (
      <Select
        placeholder="Please select a bill type"
        onChange={this.handleTypeSelectChange}
      >
        {
          this.state.types.map(
            type => <Option key={type.id} value={type.name}>{type.desc}</Option>
          )
        }
      </Select>
    );

    const providerSelectComponent = (
      <Select
        placeholder="Please select a provider!"
        showSearch
        onChange={this.handleProviderSelectChange}
      >
      {
        this.state.providers.map(
          provider => <Option key={provider.id} value={provider.name}>{provider.desc}</Option>
        )
      }
    </Select>
  );


    return (
      <Form>
        <FormItem
            {...formItemLayout}
            label="Type"
            hasFeedback
          >
         {
           getFieldDecorator('type', {
             rules: [
               { type: 'string', required: true, message: 'Please select a type!' },
             ],
             })
             (
               typeSelectComponent
             )
        }
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
            providerSelectComponent
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

const mapStateToProps = state => ({
  providers: state.providers,
  types: state.billTypes,
});

const WrappedRegistrationForm = Form.create()(AddBillForm);

export default connect(mapStateToProps)(WrappedRegistrationForm);
