//      

import  * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, Switch, Divider, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedBills } from 'reducers/bills/actions';

class BillTable extends React.Component        {
  onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    console.log("branch pay-bill");
    this.props.actions.setSelectedBills(selectedRowKeys);
  };

  render() {
    const columnsConfig = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      }, {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },{
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
      }, {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }, {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Switch className={css(styles.switch)} defaultChecked />
            <Divider type="vertical" />
              {/* <a href="javascript:;">Edit</a> */}
              {/* <Button icon="edit" ghost shape="circle" style={{ fontSize: '16px', color: '#08c' }} /> */}
              <Icon type="edit" style={{ fontSize: '16px', color: '#08c' }} onClick={this.onclick} />

            <Divider type="vertical" />
            <Icon type="delete" style={{ fontSize: '16px', color: '#08c' }} />
          </span>
        ),
      }
    ];
    
    const styles = StyleSheet.create({
      switch: {
        width:  '32px',
      }
    });
    
    const rowSelection = {
      selectedRowKeys: this.props.selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Table
        rowKey='id'
        dataSource={this.props.allBills} 
        columns={columnsConfig} 
        rowSelection={rowSelection}
      />
    )
  }
}

const mapStateToProps = state => ({
  allBills: state.bills,
  selectedRowKeys: state.selectedRowsKeys,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setSelectedBills,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BillTable);
