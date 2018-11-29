import * as constants from './constants';
import * as billService from 'service/billService';
import numeral from 'numeral';

export const getBills = () => (
  (dispatch, getState) => {
    billService.getBills().then(result => {
      dispatch({
        type: constants.SET_BILLS,
        payload: result,
      });
    });
  }
);

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

export const addBill = (bill) => (
  (dispatch, getState) => {
    bill.key = getState().bills.length + 1;
    bill.status = "Not paid";
    bill.dueDate = bill.dueDate.format('DD/MM/YYYY');
    bill.amount = 'NZD' + numeral(bill.amount).format('0,0.00');
    dispatch({
      type: constants.ADD_BILL,
      payload: bill,
    });
    dispatch(closeAddBillModal());
  });
