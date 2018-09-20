import * as constants from './constants';

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
