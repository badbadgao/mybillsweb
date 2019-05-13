// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Layout, Breadcrumb, Button, Row } from 'antd';

import BillTable from './BillTable';
import { addBill, getBills, openAddBillModal, getProviders, getBillTypes } from 'reducers/bills/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddBillModal from './addBillModal';

const { Content } = Layout;

const styles = StyleSheet.create({
  addButton: {
    display: 'flex',
  }
});

type Props = {
  actions: {
    getBills: Function,
    getProviders: Function,
    getBillTypes: Function,
    openAddBillModal: Function,
  },
  deleteButtonDisabled: boolean,
};

class ContentBody extends React.Component<Props> {

  componentDidMount() {
    this.props.actions.getBills();
    this.props.actions.getProviders();
    this.props.actions.getBillTypes();
  }

  handleAdd = () => {
    this.props.actions.openAddBillModal();
  }

  handleDelete = () => {
    // this.props.actons
  }
  
  render() {
    return(
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <Row>
            <Button  onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
              Add Bill
            </Button>
            <Button 
              onClick={this.handleDelete}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
              disabled={this.props.deleteButtonDisabled}
            >
              Delete
            </Button>
          </Row>
          <BillTable />
          <AddBillModal/>
        </Content>
      </Layout>
    )
  }
};

const mapStateToProps = state => ({
  deleteButtonDisabled: !state.selectedRowsKeys || state.selectedRowsKeys.length == 0,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addBill,
    getBills,
    openAddBillModal,
    getProviders,
    getBillTypes,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentBody);
