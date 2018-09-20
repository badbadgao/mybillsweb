//      

import  * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, Switch, Divider } from 'antd';
import { connect } from 'react-redux';

const columns = [
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

              
                                       
                                    
               
  

const BillTable = (props       ) => {
  return (
    <Table dataSource={props.dataSource} columns={columns} />
  )
};

const mapStateToProps = state => ({
  dataSource: state.bills,
});

export default connect(mapStateToProps)(BillTable);
