// @flow

import  * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, Switch, Divider, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { filter, find } from 'lodash';

import * as billType from 'constant/billType';
import { setSelectedBills } from 'reducers/bills/actions';

type Props = {
  columns: React.ChildrenArray<any>,
  selectedRowKeys: React.ChildrenArray<any>,
  actions: React.Node,
  allBills: React.ChildrenArray<any>,
};

class BillTable extends React.Component<Props> {
  onSelectChange = (selectedRowKeys) => {
    this.props.actions.setSelectedBills(selectedRowKeys);
  };

  getTableDataByBillType = () => {
    var now = moment();
    const tableData = filter(this.props.allBills, bill => {
      switch (this.props.billType) {
        case billType.DUE:
          return !moment(bill.dueDate).isBefore(now) && bill.status == "Unpaid";
        case billType.OVER_DUE:
          return moment(bill.dueDate).isBefore(now) && bill.status == "Unpaid";
        case billType.PAID:
          return bill.status == "Paid";
        default:
          return true;
      }
    });
    return tableData;
  }
  render() {
    const styles = StyleSheet.create({
      switch: {
        width:  '64px',
      }
    });
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
            <a href="javascript:;">Pay</a>
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
    
    
    const rowSelection = {
      selectedRowKeys: this.props.selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const tableData = this.getTableDataByBillType();
    return (
      <Table
        rowKey='id'
        dataSource={tableData} 
        columns={columnsConfig} 
        rowSelection={rowSelection}
      />
    )
  }
}

const mapStateToProps = state => ({
  allBills: state.bills,
  selectedRowKeys: state.selectedRowsKeys,
  billType: state.selectedBillType,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setSelectedBills,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BillTable);
