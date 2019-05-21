// @flow

import  * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, Divider, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, message } from 'antd';
import numeral from 'numeral';

import * as billType from 'constant/billType';
import { setSelectedBills, payBill } from 'reducers/bills/actions';
import PayBillModal from './PayBillModal';

type Bill = {
  id: number,
  amount: number,
  provider: string,
};

type Props = {
  columns: React.ChildrenArray<any>,
  selectedRowKeys: React.ChildrenArray<any>,
  actions: {
    payBill: Function,
    setSelectedBills: Function,
  },
  billsOverDue: Array<Bill>,
  billsPaid: Array<Bill>,
  billsDue: Array<Bill>,
  billType: string
};

type State = {
  showPayModal: boolean,
  billToPay?: {
    id: number,
    amount: number,
    provider: string,
  },
}

class BillTable extends React.Component<Props, State> {
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
    });

    if (this.state.billToPay) {
      this.props.actions.payBill(this.state.billToPay.id,
        () => message.success('Bill is paid successfully!', 3),
        (error) => message.error('Failed to pay bill, please try again', 3),
      );
    }
    else {
      console.error("No bill is selected");
    }
  }

  render() {
    const dateColumn = billType.PAID !== this.props.billType ? 
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      } : {
        title: 'Paid Date',
        dataIndex: 'paidDate',
        key: 'paidDate',
      };

    const columnsConfig = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      }, {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount, record) => numeral(amount).format('$0,0[.]00'),
      },{
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
      }, 
      dateColumn,
      {
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
            <Icon type="edit" style={{ fontSize: '16px', color: '#08c' }} onClick={() => console.log("edit bill")} />

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
