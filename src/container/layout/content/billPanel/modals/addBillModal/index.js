// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Form, message } from 'antd';

import { openAddBillModal, closeAddBillModal, addBill, clearSelection, } from 'reducers/bills/actions';
import AddBillForm from './AddBillForm';

type State = {
  loading: boolean,
};

type Props = {
  actions: Object,
  visible: boolean,
  form: {
    resetFields: Function,
    validateFields: Function,
  },
};

class AddBillModal extends React.Component<Props, State> {
  formRef: {
    props: {
      form: {
        resetFields: Function,
        validateFields: Function,
      }
    }
  };

  state = {
    loading: false,
  }

  handleCancel = () => {
    this.props.actions.closeAddBillModal();
  }

  handleOk = () => {
    const form = this.formRef ? this.formRef.props.form : undefined;
    const { actions, ...otherProps } = this.props;
    this.setState({
      loading: true
    });
    if (form) {
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        actions.addBill({...values},
        () => {
          message.success('Bill is created successfully!', 3);
          form.resetFields();
        },
        error => {
          message.error('Failed to create create bill, please try again.', 3);
          this.setState({
           loading: false
          });
        });
      });
    }
    else {
      console.error("Form is not initialised");
    }
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
          maskClosable={false}
        >
          <AddBillForm
            wrappedComponentRef={(form) => this.formRef = form}
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
    clearSelection,
  }, dispatch)
});

const mapStateToProps = state => ({
  visible: state.addBillModalOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBillModal);
