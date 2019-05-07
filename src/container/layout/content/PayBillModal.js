// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Form, message } from 'antd';

import { openAddBillModal, closeAddBillModal, addBill, clearSelection, } from 'reducers/bills/actions';
import AddBillForm from './AddBillForm';

type State = {
    showPayModal: boolean,
};

type Props = {
  actions: Object,
  visible: boolean,
};

class PayBillModal extends React.Component<Props, State> {
    payBill = (bill) => {
        this.props.onPay();
    }

    cancelPay = () => {
        this.props.onCancel();
    }

  render() {
    const footerButtons = [
        <Button key="Cancel" onClick={this.cancelPay}>Cancel</Button>,
        <Button key="Pay" type="primary" onClick={this.payBill}>
            Pay
        </Button>,
      ];

    return(
      <div>
        <Modal
          visible={this.props.visible}
          title="Pay bill"
          onCancel={this.cancelPay}
          footer={footerButtons}
          maskClosable={false}
        >
        <div>
          Are you sure you want to pay {this.props.bill ? this.props.bill.amount : 0} to {this.props.bill ? this.props.bill.provider : ""}?
        </div>
        </Modal>
      </div>
    )
  }
};

export default PayBillModal;
