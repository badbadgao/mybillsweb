import * as constants from './constants';
import * as billService from 'service/billService';
import numeral from 'numeral';
import { map } from 'lodash';

export const getBills = () => (
  (dispatch, getState) => {
    billService.getBills().then(bills => {
      const result = map(bills, bill => {
        return {...bill, amount: 'NZD' + bill.amount};
      });
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

export const addBill = (bill, callback, handleError) => (
  (dispatch, getState) => {
    billService.addBill(bill)
      .then(bills => {
        const result = map(bills, bill => {
          return {...bill, amount: 'NZD' + bill.amount};
        });
        dispatch({
          type: constants.SET_BILLS,
          payload: result,
        });
        // callback to the ui when request adding bill successfully
        callback();

        // clear selection and close the modal
        dispatch(closeAddBillModal());
        dispatch(clearSelection())
      }, error => {
        handleError(error);
      })
  });

export const deleteBill = () => (
  (dispatch, getState) => {
    const selectedRowsKeys = getState().selectedRowsKeys;
    console.log(selectedRowsKeys);
    console.log(getState().bills);
    // const selectIds = map(selectedRowsKeys, rowIndex => getState().bills[rowIndex].id);
    billService.deleteBill(`ids=${selectedRowsKeys.join()}`)
      .then(result => {
        console.log(result);
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
