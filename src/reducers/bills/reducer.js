import * as constants from './constants';
import initialState from './initialState';

const app = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_BILL:
      return {
        ...state,
        bills: [...state.bills, action.payload],
      }
    default:
      return state;
  }
};

export default app;
