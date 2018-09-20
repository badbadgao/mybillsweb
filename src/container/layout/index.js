import React from 'react';
import { Layout } from 'antd';

import Header from './header';
import SideNavi from './sidenavigator';
import ContentBody from './content';

class MainLayout extends React.Component {
  render() {
    return (
        <Layout>
          <Header />
          <Layout>
            <SideNavi />
            <ContentBody />
          </Layout>
        </Layout>
    )
  }
}
  
export default MainLayout;
