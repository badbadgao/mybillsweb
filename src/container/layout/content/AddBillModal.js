// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreator, bindActionCreators } from 'redux';

import { Modal, Button, Form } from 'antd';

import { openAddBillModal, closeAddBillModal } from 'reducers/bills/actions';
import AddBillForm from './AddBillForm';

type Props = {
  actions: Object,
  visible: boolean,
};

class AddBillModal extends React.Component<Props> {

  handleCancel = () => {
    this.props.actions.closeAddBillModal();
  }

  handleOk = () => {
    console.log('Received values of form: ');
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      
      console.log('Received values of form: ', values);
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
    closeAddBillModal
  }, dispatch)
});

const mapStateToProps = state => ({
  visible: state.addBillModalOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBillModal);
