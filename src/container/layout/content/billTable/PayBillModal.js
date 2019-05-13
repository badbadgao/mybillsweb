// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Form, message } from 'antd';

type Props = {
  visible: boolean,
  onCancel: Function,
  onPay: Function,
  bill?: {
    amount: number,
    provider: string,
  },
};

const PayBillModal = (props: Props) => {
  const footerButtons = [
      <Button key="Cancel" onClick={props.onCancel}>
        Cancel
      </Button>,
      <Button key="Pay" type="primary" onClick={props.onPay}>
        Pay
      </Button>,
    ];

  return(
    <div>
      <Modal
        visible={props.visible}
        title="Pay bill"
        onCancel={props.onCancel}
        footer={footerButtons}
        maskClosable={false}
      >
      <div>
        Are you sure you want to pay {props.bill ? props.bill.amount : 0} to {props.bill ? props.bill.provider : ""}?
      </div>
      </Modal>
    </div>
  )
};

export default PayBillModal;
