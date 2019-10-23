// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StyleSheet, css } from 'aphrodite';
import { Layout, Breadcrumb} from 'antd';

import BillPanel from './billPanel';
import { getProviders, getBillTypes } from 'reducers/bills/actions';
const { Content } = Layout;

const ContentBody = (props) => (
  <Layout style={{ padding: '0 24px 24px' }}>
    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
      <BillPanel />
    </Content>
  </Layout>
);

export default ContentBody;
