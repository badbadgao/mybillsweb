// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StyleSheet, css } from 'aphrodite';
import { Layout, Breadcrumb} from 'antd';

import BillPanel from './billPanel';
import { getProviders, getBillTypes } from 'reducers/bills/actions';
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
  render() {
    return(
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <BillPanel />
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
    getProviders,
    getBillTypes,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentBody);
