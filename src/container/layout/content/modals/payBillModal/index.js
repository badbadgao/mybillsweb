
// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Form, message } from 'antd';
import numeral from 'numeral';

import { closePayBillModal, payBill } from 'reducers/bills/actions';

type Props = {
  visible: boolean,
  onPay: Function,
  actions: {
    onCancel: Function,
  },
};

const PayBillModal = (props: Props) => {
  const onPay = () => {
    if (props.bill) {
      props.actions.payBill(props.bill.id,
        () => message.success('Bill is paid successfully!', 3),
        (error) => message.error('Failed to pay bill, please try again', 3),
      );
    }
    else {
      console.error("No bill is selected");
    }
  };

  const footerButtons = [
      <Button key="Cancel" onClick={props.actions.onCancel}>
        Cancel
      </Button>,
      <Button key="Pay" type="primary" onClick={onPay}>
        Pay
      </Button>,
  ];

  return(
    <div>
      <Modal
        visible={props.visible}
        title="Pay bill"
        onCancel={props.actions.onCancel}
        footer={footerButtons}
        maskClosable={false}
      >
      <div>
        Are you sure you want to pay { props.bill ? numeral(props.bill.amount).format('$0,0[.]00') : 0 } to {props.bill ? props.bill.provider : ""}?
      </div>
      </Modal>
    </div>
  )
};

const mapStateToProps = (state) => ({
  visible: state.payBillModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onCancel: closePayBillModal,
    payBill,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PayBillModal);
