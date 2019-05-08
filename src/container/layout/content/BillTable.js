// @flow

import  * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, Switch, Divider, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { filter, find } from 'lodash';
import { Modal, message } from 'antd';

import * as billType from 'constant/billType';
import { setSelectedBills, payBill } from 'reducers/bills/actions';
import PayBillModal from './PayBillModal';

type Props = {
  columns: React.ChildrenArray<any>,
  selectedRowKeys: React.ChildrenArray<any>,
  actions: React.Node,
  allBills: React.ChildrenArray<any>,
};

class BillTable extends React.Component<Props> {
  state = {
    showPayModal: false,
    billToPay: undefined,
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.actions.setSelectedBills(selectedRowKeys);
  };

  getTableDataByBillType = () => {
    switch (this.props.billType) {
      case billType.DUE:
        return this.props.billsDue;
      case billType.OVER_DUE:
        return this.props.billsOverDue;
      case billType.PAID:
        return this.props.billsPaid;
      default:
        return this.props.billsOverDue;;
    }
  }

  showPayModal = (bill) => {
    this.setState({
      showPayModal: true,
      billToPay: bill,
    });
  }

  cancelPay = () => {
    this.setState({
      showPayModal: false,
    })
  }

  payBill = () => {
    this.setState({
      showPayModal: false,
    })
    this.props.actions.payBill(this.state.billToPay.id,
      () => message.success('Bill is paid successfully!', 3),
      (error) => message.error('Failed to pay bill, please try again', 3),
    );
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
            {
              this.props.billType !== billType.PAID
              && <span><a href="javascript:;" onClick={() => this.showPayModal(record)}>Pay</a>
              <Divider type="vertical" /></span>
            }
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
    const footerButtons = [
      <Button key="Cancel" onClick={this.cancelPay}>Cancel</Button>,
      <Button key="Pay" type="primary" onClick={this.handleOk}>
        Pay
      </Button>,
    ];
    return (
      <div>
        <Table
          rowKey='id'
          dataSource={tableData} 
          columns={columnsConfig} 
          rowSelection={rowSelection}
        />
        <PayBillModal
          visible={this.state.showPayModal}
          bill={this.state.billToPay}
          onPay={this.payBill}
          onCancel={this.cancelPay}
        />
      </div>
        
    )
  }
}

const mapStateToProps = state => ({
  billsDue: state.billsDue,
  billsOverDue: state.billsOverDue,
  billsPaid: state.billsPaid,
  selectedRowKeys: state.selectedRowsKeys,
  billType: state.selectedBillType,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setSelectedBills,
    payBill,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BillTable);
