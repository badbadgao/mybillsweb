import { fetch } from 'whatwg-fetch';
import fetchApi from './fetchApi';

export const getBills = () => new Promise((resolve, reject) => {
  fetch(`http://localhost:8090/bills`)
  .then(response => response.json())
  .then(data => resolve(data))
  .catch(error => console.log(error));
});

export const addBill = bill => fetchApi.post('/addBill', bill);

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
