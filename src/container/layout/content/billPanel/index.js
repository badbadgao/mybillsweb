// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StyleSheet, css } from 'aphrodite';
import { Layout, Breadcrumb} from 'antd';

import BillTable from './BillTable';
import AddBillModal from './modals/addBillModal';
import DeleteBillModal from './modals/DeleteBillModal';
import PayBillModal from './modals/PayBillModal';
import HeadBar from './ActionsHeader';
import { addBill, getBills, getProviders, getBillTypes } from 'reducers/bills/actions';
import { Record } from 'immutable';
const { Content } = Layout;

const styles = StyleSheet.create({
  addButton: {
    display: 'flex',
  }
});

type Props = {
  actions: Object,
  deleteButtonDisabled: boolean,
};

class BillPanel extends React.Component<Props> {

  componentDidMount() {
    this.props.actions.getBills();
    this.props.actions.getProviders();
    this.props.actions.getBillTypes();
  }

  render() {
    return(
      <React.Fragment>
        <HeadBar />
        <BillTable />
        <AddBillModal />
        <DeleteBillModal />
        <PayBillModal />
      </React.Fragment>
    )
  }
};

const mapStateToProps = state => ({
  // deleteButtonDisabled: !state.selectedRowsKeys || state.selectedRowsKeys.length == 0,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addBill,
    getBills,
    getProviders,
    getBillTypes,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BillPanel);
