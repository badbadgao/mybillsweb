import { OVER_DUE } from 'constant/billType';
export default {
  bills: [],
  billsOverDue: [],
  billsDue: [],
  billsPaid: [],
  providers: [],
  billTypes: [],
  addBillModalOpen: false,
  selectedRowsKeys: [],
  selectedBillType: undefined,
  selectedProvider: undefined,
  selectedBillType: OVER_DUE,
};
