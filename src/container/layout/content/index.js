// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Layout, Breadcrumb, Button, Row } from 'antd';

import BillTable from './BillTable';
import { addBill, getBills, openAddBillModal } from 'reducers/bills/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddBillModal from './AddBillModal';


const { Content } = Layout;

const styles = StyleSheet.create({
  addButton: {
    display: 'flex',
  }
});

type Props = {
  actions: Object,
};

class ContentBody extends React.Component<Props> {

  handleAdd = () => {
    this.props.actions.openAddBillModal();
    // this.props.actions.addBill();
    // this.props.actions.getBills();
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
          <Button  onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, marginLeft: 8 }} disabled>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addBill,
    getBills,
    openAddBillModal,
  }, dispatch)
});

export default connect(undefined, mapDispatchToProps)(ContentBody);
