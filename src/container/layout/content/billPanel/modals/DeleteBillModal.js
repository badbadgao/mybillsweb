// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button, Form, message } from 'antd';

import { closeDeleteBillModal, deleteBill } from 'reducers/bills/actions';

type Props = {
  visible: boolean,
  actions: {
    onCancel: Function,
    onDelete: Function,
  },
};

const DeleteBillModal = (props: Props) => {
  const footerButtons = [
      <Button key="Cancel" onClick={props.actions.onCancel}>
        Cancel
      </Button>,
      <Button key="Pay" type="primary" onClick={props.actions.onDelete}>
        Delete
      </Button>,
    ];

  return(
    <div>
      <Modal
        visible={props.visible}
        title="Delete bill"
        onCancel={props.actions.onCancel}
        footer={footerButtons}
        maskClosable={false}
      >
      <div>
        Are you sure you want to delete this bill?
      </div>
      </Modal>
    </div>
  )
};

const mapStateToProps = (state) => ({
  visible: state.deleteBillModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    onCancel: closeDeleteBillModal,
    onDelete: deleteBill,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBillModal);
