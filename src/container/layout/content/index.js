// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StyleSheet, css } from 'aphrodite';
import { Layout, Breadcrumb} from 'antd';

import BillTable from './billTable';
import AddBillModal from './modals/addBill';
import HeadBar from './headBar';
import { addBill, getBills, getProviders, getBillTypes } from 'reducers/bills/actions';
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

class ContentBody extends React.Component<Props> {

  componentDidMount() {
    this.props.actions.getBills();
    this.props.actions.getProviders();
    this.props.actions.getBillTypes();
  }

  render() {
    return(
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <HeadBar />
          <BillTable />
          <AddBillModal/>
        </Content>
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentBody);
