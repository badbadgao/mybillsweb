import * as constants from './constants';
import * as billService from 'service/billService';
import numeral from 'numeral';
import { map, forEach, orderBy } from 'lodash';
import moment from 'moment';

export const getBills = () => (
  (dispatch, getState) => {
    billService.getBills().then(bills => {
      dispatch(calculateBills(bills));
    });
  }
);

const calculateBills = (bills) => (
  (dispatch, getState) => {
    dispatch({
      type: constants.SET_BILLS,
      payload: bills,
    });
    
    const billsOverDue = [];
    const billsDue = [];
    const billsPaid = [];
    const now = moment();
    //The bills returned are already ordered by dueDate asc
    forEach(bills, bill => {
      if (bill.status == "Paid") {
        billsPaid.push(bill);
      }
      else if (!moment(bill.dueDate).isBefore(now)) {
        billsDue.push(bill);
      }
      else {
        billsOverDue.push(bill);
      }
    });
    dispatch(setBillsDue(billsDue));
    dispatch(setBillsOverDue(billsOverDue));
    //Order the paid date desc
    dispatch(setBillsPaid(orderBy(billsPaid, 'dueDate', 'desc')));
  }
);

export const setBillsDue = (billsDue) => ({
  type: constants.SET_BILLS_DUE,
  payload: billsDue,
});

export const setBillsOverDue = (billsOverDue) => ({
  type: constants.SET_BILLS_OVER_DUE,
  payload: billsOverDue,
});

export const setBillsPaid = (billsPaid) => ({
  type: constants.SET_BILLS_PAID,
  payload: billsPaid,
});

export const getProviders = () => (
  dispatch => {
    billService.getProviders().then(result => {
      dispatch({
        type: constants.SET_PROVIDERS,
        payload: result,
      });
    });
  }
);

export const getBillTypes = () => (
  dispatch => {
    billService.getBillTypes().then(result => {
      dispatch({
        type: constants.SET_BILL_TYPES,
        payload: result,
      });
    });
  }
);

export const openAddBillModal = () => (
  dispatch => {
    dispatch({
      type: constants.OPEN_ADD_BILL_MODAL,
    });
  }
);

export const closeAddBillModal = () => (
  dispatch => {
    dispatch({
      type: constants.CLOSE_ADD_BILL_MODAL,
    });
  }
);

export const setSelectedBills = (selectedRowsKeys) => (
  dispatch => {
    dispatch({
      type: constants.SET_SELECTED_BILLS,
      payload: selectedRowsKeys,
    });
  }
);

export const setSelectedBillType = (selectedBillType) => (
  dispatch => {
    dispatch({
      type: constants.SET_SELECTED_BILL_TYPE,
      payload: selectedBillType,
    });
  }
);

export const addBill = (bill, callback, handleError) => (
  (dispatch, getState) => {
    billService.addBill(bill)
      .then(bills => {
        dispatch(calculateBills(bills));
        // callback to the ui when request adding bill successfully
        callback();

        // clear selection and close the modal
        dispatch(closeAddBillModal());
        dispatch(clearSelection())
      }, error => {
        handleError(error);
      })
  });

export const payBill = (billId, callback, handleError) => (
  (dispatch, getState) => {
    billService.payBill(billId)
      .then(bills => {
        dispatch(calculateBills(bills));
        callback();
      }, error => {
        handleError(error);
      })
  }
)

export const deleteBill = () => (
  (dispatch, getState) => {
    const selectedRowsKeys = getState().selectedRowsKeys;
    console.log(selectedRowsKeys);
    console.log(getState().bills);
    // const selectIds = map(selectedRowsKeys, rowIndex => getState().bills[rowIndex].id);
    billService.deleteBill(`ids=${selectedRowsKeys.join()}`)
      .then(updatedBills => {
        dispatch({
          type: constants.SET_BILLS,
          payload: updatedBills,
        });
        dispatch(calculateBills(updatedBills));
        dispatch(clearSelection())
      },
      error => console.log(error));
  });

export const clearSelection = () => (
  dispatch => {
    dispatch({
      type: constants.RESET_BILL_TABLE,
    });
  }
);
