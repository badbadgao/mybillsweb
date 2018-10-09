import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreator, bindActionCreators } from 'redux';

import { Modal, Button } from 'antd';

import { openAddBillModal, closeAddBillModal } from 'reducers/bills/actions';

type Props = {
  actins: Objeddct,
};

class AddBillModal extends React.Component<Props> {

  handleCancel = () => {
    this.props.actions.closeAddBillModal();
  }

  handleOk = () => {
    this.props.actions.openAddBillModal();
  }

  render() {
    return(
      <div> 
        <Modal
          visible={this.props.visible}
          title="Add Bill"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="save" type="primary" onClick={this.handleOk}>
              Save
            </Button>,
          ]}
        >
        </Modal>
      </div>
    )
  }
}

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
