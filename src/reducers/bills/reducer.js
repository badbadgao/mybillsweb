import * as constants from './constants';
import initialState from './initialState';

const app = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_BILL:
      return {
        ...state,
        bills: [...state.bills, action.payload],
      }
    case constants.CLOSE_ADD_BILL_MODAL:
      return {
        ...state,
        addBillModalOpen: false,
      }
    case constants.OPEN_ADD_BILL_MODAL:
      return {
        ...state,
        addBillModalOpen: true,
      }
    case constants.SET_SELECTED_BILLS:
      return {
        ...state,
        selectedRowsKeys: action.payload,
      }
    default:
      return state;
  }
};

export default app;
