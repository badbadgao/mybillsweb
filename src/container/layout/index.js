// @flow

import * as React from 'react';
import { Layout } from 'antd';

import Header from './header';
import SideNavi from './sidenavigator';
import ContentBody from './content';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#777',
    margin: '16px',
  },
});

type Props = {
};

const MainLayout = (props: Props) => {
  return (
      <Layout>
        <Header />
        <Layout className={css(styles.layout)}>
          <SideNavi />
          <ContentBody />
        </Layout>
      </Layout>
  )
};
  
export default MainLayout;
