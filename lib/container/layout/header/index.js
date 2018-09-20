import React from 'react';
import { Layout } from 'antd';
import { StyleSheet, css } from 'aphrodite';
const { Header} = Layout;

const styles = StyleSheet.create({
  blue: {
    backgroundColor: '#AA00FF',
  },
  title: {
    color: '#ffffff',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'start',
  },
});

const HeaderContainer = props => (
  <Header className={css(styles.blue)}>
    <div className="logo" />
    <div className={css(styles.title)}>My Bills</div>
  </Header>
);

export default HeaderContainer;
