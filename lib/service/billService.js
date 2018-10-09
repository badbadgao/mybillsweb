export const getBills = () => new Promise((resolve, reject) => {
  const bills = [{
    key: '1',
    type: 'WaterCare',
    provider: 'City Council',
    amount: '$87',
    dueDate: '02/10/2018',
    status: 'Not Paid'
  }, {
    key: '2',
    type: 'Electricity',
    amount: '$202',
    provider: 'Contact Energy',
    dueDate: '06/10/2018',
    status: 'Not Paid'
  }];

  resolve(bills);
});
