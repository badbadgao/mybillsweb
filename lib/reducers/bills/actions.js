import * as constants from './constants';
import * as billService from 'service/billService';

export const addBill = () => (
  (dispatch, getState) => {
    dispatch({
      type: constants.ADD_BILL,
      payload:  {
        key: '1',
        type: 'Electricity',
        amount: '$202',
        provider: 'Contact Energy',
        dueDate: '06/10/2018',
        status: 'Not Paid'
      },
    });
  }
)


export const getBills = () => (
  (dispatch, getState) => {
    billService.getBills().then(result => {
      console.log(result);
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
