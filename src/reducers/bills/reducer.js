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
    case constants.SET_BILL_TYPES:
      return {
        ...state,
        billTypes: action.payload,
      }
    case constants.SET_PROVIDERS:
      return {
        ...state,
        providers: action.payload,
      }
    case constants.SET_BILLS:
      return {
        ...state,
        bills: action.payload,
      }
    case constants.RESET_BILL_TABLE:
      return {
        ...state,
        selectedRowsKeys: initialState.selectedRowsKeys,
      }
    case constants.SET_SELECTED_BILL_TYPE:
      return {
        ...state,
        selectedBillType: action.payload,
      }
    case constants.SET_BILLS_DUE:
      return {
        ...state,
        billsDue: action.payload,
      }
    case constants.SET_BILLS_OVER_DUE:
      return {
        ...state,
        billsOverDue: action.payload,
      }
    case constants.SET_BILLS_PAID:
      return {
        ...state,
        billsPaid: action.payload,
      }
    case constants.CLOSE_DELETE_BILL_MODAL:
      return {
        ...state,
        deleteBillModalOpen: false,
      }
    case constants.OPEN_DELETE_BILL_MODAL:
      return {
        ...state,
        deleteBillModalOpen: true,
      }
    case constants.CLOSE_PAY_BILL_MODAL:
      return {
        ...state,
        payBillModalOpen: false,
      }
    case constants.OPEN_PAY_BILL_MODAL:
      return {
        ...state,
        payBillModalOpen: true,
      }
    case constants.SET_SELECTED_BILL_TO_PAY:
        return {
          ...state,
          selectedBillToPay: action.payload,
        }
    default:
      return state;
  }
};

export default app;
