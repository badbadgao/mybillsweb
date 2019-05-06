import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Menu, Icon } from 'antd';

import * as billType from 'constant/billType';
import * as menuKeys from 'constant/menuKeys';
import { setSelectedBillType } from 'reducers/bills/actions';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideNavi = props => {
  const onMenuClick = ({ item, key, keyPath }) => {
    props.actions.setSelectedBillType(key);
  }

  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[billType.OVER_DUE]}
        defaultOpenKeys={[menuKeys.MENU_HISTORY]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key={menuKeys.MENU_HISTORY} title={<span><Icon type="book" />Bill History</span>}>
          <Menu.Item key={billType.OVER_DUE} onClick={onMenuClick}>
            <Icon type="warning" theme="twoTone" twoToneColor="#ff0000" />
            Over Due
          </Menu.Item>
          <Menu.Item key={billType.DUE} onClick={onMenuClick}>
            <Icon type="warning" theme="twoTone" twoToneColor="#f7aa04" />
            Due
          </Menu.Item>
          <Menu.Item key={billType.PAID} onClick={onMenuClick}>
          <Icon type="smile" theme="twoTone" twoToneColor="#00ff00" />
            Paid
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setSelectedBillType,
  }, dispatch)
});
export default connect(undefined, mapDispatchToProps)(SideNavi);


