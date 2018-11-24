// @flow

import  * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, Switch, Divider } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedBills } from 'reducers/bills/actions';

type Props = {
  dataSource: React.ChildrenArray<any>,
  columns: React.ChildrenArray<any>,
  selectedRowKeys: React.ChildrenArray<any>,
  actions: React.Node,
};

class BillTable extends React.Component<Props> {
  onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
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
            <a href="javascript:;">Edit</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
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
        dataSource={this.props.dataSource} 
        columns={columnsConfig} 
        rowSelection={rowSelection} />
    )
  }
};

const mapStateToProps = state => ({
  dataSource: state.bills,
  selectedRowKeys: state.selectedRowsKeys,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setSelectedBills,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BillTable);
