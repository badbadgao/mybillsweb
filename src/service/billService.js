import { fetch } from 'whatwg-fetch';
import fetchApi from './fetchApi';

export const addBill = bill => fetchApi.post('/bill', bill);

export const getBills = () => fetchApi.get('/bills');

export const payBill = (id) => fetchApi.put(`/bill/${id}`)

export const deleteBill = idsParam => fetchApi.delete(`/bill?${idsParam}`)

export const getBillTypes = () => new Promise((resolve, reject) => {
  const billTypes = [
    {
      id: 1,
      name: 'Water',
      desc: 'Water',
    },
    {
      id: 2,
      name: 'Electricity',
      desc: 'Electricity',
    },
    {
      id: 3,
      name: 'Internet',
      desc: 'Internet',
    }
  ];

  resolve(billTypes);
});


export const getProviders = () => new Promise((resolve, reject) => {
  const providers = [{
    id: 1,
    type: ['Water'],
    name: 'City Council',
    desc: 'City Council',
  }, {
    id: 2,
    type: ['Internet'],
    name: 'Spark',
    desc: 'Spark',
  },
  {
    id: 3,
    type: ['Internet'],
    name: 'Vodaphone',
    desc: 'Vodaphone',
  },
  {
    id: 4,
    type: ['Electricity', 'Internet'],
    name: 'Contact Energy',
    desc: 'Contact Energy',
  },
  {
    id: 5,
    type: ['Electricity', 'Internet'],
    name: 'Mecrucy',
    desc: 'Mecrucy',
  },
];

  resolve(providers);
});
