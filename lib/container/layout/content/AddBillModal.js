//      

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Form } from 'antd';

import { openAddBillModal, closeAddBillModal, addBill } from 'reducers/bills/actions';
import AddBillForm from './AddBillForm';

class AddBillModal extends React.Component {

  handleCancel = () => {
    this.props.actions.closeAddBillModal();
  }

  handleOk = () => {
    console.log('Received values of form: ');
    const form = this.formRef.props.form;
    const { actions, ...otherProps } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      
      console.log('Received values of form: ', values);
      actions.addBill({...values});
      form.resetFields();
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const footerButtons = [
      <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
      <Button key="create" type="primary" onClick={this.handleOk}>
        Create
      </Button>,
    ];

    return(
      <div> 
        <Modal
          visible={this.props.visible}
          title="Create a bill"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={footerButtons}
        >
          <AddBillForm
            wrappedComponentRef={this.saveFormRef}
          />
        </Modal>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    openAddBillModal,
    closeAddBillModal,
    addBill,
  }, dispatch)
});

const mapStateToProps = state => ({
  visible: state.addBillModalOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBillModal);
