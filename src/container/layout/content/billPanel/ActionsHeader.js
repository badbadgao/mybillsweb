// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';

import { openAddBillModal, openDeleteBillModal } from 'reducers/bills/actions';

type Props = {
    actions: {
        openAddBillModal: Function,
        deleteBill: Function,
        openDeleteBillModal: Function,
    },
    deleteButtonDisabled: boolean,
};

const ActionsHeader = (props : Props) => {
    return (
        <div>
            <Button
                onClick={props.actions.openAddBillModal}
                type="primary"
                style={{ marginBottom: 16 }}
            >
                Add Bill
            </Button>
            <Button 
                onClick={props.actions.openDeleteBillModal}
                type="primary"
                style={{ marginBottom: 16, marginLeft: 8 }}
                disabled={props.deleteButtonDisabled}
            >
                Delete
            </Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    deleteButtonDisabled: !state.selectedRowsKeys || state.selectedRowsKeys.length == 0,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        openAddBillModal,
        openDeleteBillModal,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionsHeader);